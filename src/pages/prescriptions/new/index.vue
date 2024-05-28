<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import axios from "@/lib/axios";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const medicalRecordsSelectValues = ref([]);
const patientsSelectValues = ref([]);
const doctorsSelectValues = ref([]);
const medicinesSelectValues = ref([]);
const periodOfTimeSelectValues = ref([
      { value: 0, name: "Seleccione un periodo" },
      { value: "4 horas", name: "4 horas" },
      { value: "6 horas", name: "6 horas" },
      { value: "8 horas", name: "8 horas" },
      { value: "12 hohorasurs", name: "12 horas" },
      { value: "Cada día", name: "Cada día" },
      { value: "A la semana", name: "A la semana" }
    ]);
const selectedMedicines = ref([]);
const selectedMedicineNames = ref([]);

const selectedMedicineVar = ref(null);
const selectedDoseVar = ref("");
const selectedTimePeriodVar = ref(0);
const medicinesTable = ref([]);

const fetchPatientData = async () => {
  try {
    const doctorsRequest = await axios.get(`/doctors`);
    const medicinesRequest = await axios.get(`/medicines`);
    const patientsRequest = await axios.get(`/patients`);
    const doctorsTable = doctorsRequest.data;
    const patientsTable = patientsRequest.data;
    medicinesTable.value = medicinesRequest.data;

    medicinesSelectValues.value = [
      {
        "id": null,
        "name": "Seleccione un medicamento"
      },
      ...medicinesTable.value
    ];

    doctorsSelectValues.value = doctorsTable.map(doctor => ({
      value: doctor.id,
      text: doctor.name,
    }));

    patientsSelectValues.value = patientsTable.map(patient => ({
      value: patient.id,
      text: patient.name,
    }));

    const doctorLookup = doctorsTable.reduce((acc, doctor) => {
      acc[doctor.id] = doctor.name;
      return acc;
    }, {});

    const patientLookup = patientsTable.reduce((acc, patient) => {
      acc[patient.id] = patient.name;
      return acc;
    }, {});

    const medicalRecordsRequest = await axios.get(`/medical-records`);
    const medicalRecordsTable = medicalRecordsRequest.data;

    medicalRecordsSelectValues.value = medicalRecordsTable.map(record => ({
      value: record.id,
      text: `${record.datetime} - ${patientLookup[record.patient_id]} - ${doctorLookup[record.doctor_id]}`,
    }));

    medicalRecordsSelectValues.value.unshift({
      value: null,
      text: "Seleccione una cita"
    });

  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
};
fetchPatientData();

const formSchema = toTypedSchema(
  z.object({
      date: z.string(),
      medical_record_id: z.number(),
      notes: z.string(),
  })
);

const form = useForm({
    validationSchema: formSchema,
});

const router = useRouter();
const onSubmit = form.handleSubmit((values) => {
  values.medicines = selectedMedicineNames.value;
  console.log(values);
  /* axios.post(`/prescriptions/`, values).then(() => {
    router.push(`/prescriptions`);
  }); */
});

const addNewMedicine = () => {
  if (selectedMedicineVar.value && selectedDoseVar.value && selectedTimePeriodVar.value) {
    const selectedMedicineId = selectedMedicineVar.value;
    const selectedMedicine = medicinesTable.value.find(medicine => medicine.id === selectedMedicineId);

    if (selectedMedicine) {
      selectedMedicineNames.value.push({
        medicine_id: selectedMedicine.id,
        medicine_name: selectedMedicine.name,
        dose: selectedDoseVar.value,
        timePeriod: selectedTimePeriodVar.value
      });

      selectedMedicineVar.value = null;
      selectedDoseVar.value = "";
      selectedTimePeriodVar.value = 0;
    } else {
      console.error("El medicamento seleccionado no se encontró en la tabla de medicamentos.");
    }
  }
};
</script>

<template>
  <div class="space-y-2">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <RouterLink to="/">Inicio</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/prescriptions">
            <RouterLink to="/prescriptions">Recetas</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Registrar receta</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- date -->
      <FormField v-slot="{ componentField }" name="date">
        <FormItem>
          <FormLabel>Fecha de realización de la receta</FormLabel>
          <FormControl>
            <Input type="date" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="notes">
        <FormItem>
          <FormLabel>Descripción de la receta</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- medical record -->
      <FormField v-slot="{ componentField }" name="medical_record_id">
        <FormItem>
          <FormLabel>Consulta</FormLabel>
          <FormControl>
            <select v-bind="componentField">
              <option v-for="record in medicalRecordsSelectValues" :key="record.value" :value="record.value">
                {{ record.text }}
              </option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- medicines -->
      <div class="flex gap-4">
        <div class="border-2 border-gray-300 p-2 rounded-sm">
          <h1 class="font-bold">Medicinas</h1>
          <p>Seleccione una y se agregara a la lista automaticamente</p>
          <div class="flex gap-4">
            <select class="border-2 border-gray-200 rounded-md p-2" v-model="selectedMedicineVar">
              <option v-for="medicine in medicinesSelectValues" :key="medicine.id" :value="medicine.id">
                {{ medicine.name }}
              </option>
            </select>
            <input type="number" placeholder="Dosis" class="border-2 border-gray-200 rounded-md p-2" v-model="selectedDoseVar" />
            <select class="border-2 border-gray-200 rounded-md p-2" v-model="selectedTimePeriodVar" >
              <option v-for="time in periodOfTimeSelectValues" :key="time.value" :value="time.value">
                {{ time.name }}
              </option>
            </select>
            <Button class="bg-gray-500" type="button" @click="addNewMedicine()">Confirmar</Button>
          </div>
        </div>
        <div>
          <h1 class="font-semibold">Medicinas seleccionadas</h1>
          <ul>
            <li v-for="selected in selectedMedicineNames" :key="name"
            class="border-2 border-gray-300 p-2 rounded-sm">{{ selected.name }}, Dosis: {{ selected.dose }}, Cada: {{ selected.timePeriod }}</li>
          </ul>
        </div>
      </div>
      <Button type="submit">Guardar</Button>
    </form>
  </div>
</template>