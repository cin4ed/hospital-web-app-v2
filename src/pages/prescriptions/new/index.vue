<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import axios from "@/lib/axios";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'vue-sonner'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
      { value: "0", name: "Seleccione un periodo" },
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
const selectedTimePeriodVar = ref("");
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

    medicalRecordsSelectValues.value = medicalRecordsTable
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    .map(record => ({
      key: `${record.datetime}`,
      value: String(record.id),
      text: `${record.datetime} - ${patientLookup[record.patient_id]} - ${doctorLookup[record.doctor_id]}`,
    }));

  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
};
fetchPatientData();

const formSchema = toTypedSchema(
  z.object({
      date: z.string(),
      medical_record_id: z.string(),
      notes: z.string(),
  })
);

const form = useForm({
    validationSchema: formSchema,
});

const router = useRouter();
const onSubmit = form.handleSubmit(async (values) => {
  const transformedMedicines = selectedMedicineNames.value.map(item => ({
    medicine_id: item.medicine_id,
    indications: `${item.dose} ${item.medicine_name} ${item.timePeriod}`
  }));
  values.medicines = transformedMedicines
  try {
    console.log(values);
    await axios.post(`/prescriptions/`, values);
    toast.success('Su registro se ha agregado con éxito');
    router.push(`/prescriptions`);
  } catch (error) {
    console.error("Error al crear su elemento:", error);
    if (error.response && error.response.data && error.response.data.message) {
      toast.error('Ha ocurrido un error al intentar agregar un nuevo registro', {
        description: `${error.response.data.message}`,
      });
    } else {
      toast.error('Ha ocurrido un error desconocido al intentar agregar un nuevo registro');
    }
  }
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

      medicinesSelectValues.value = medicinesSelectValues.value.filter(medicine => medicine.id !== selectedMedicineId);

      selectedMedicineVar.value = null;
      selectedDoseVar.value = "";
      selectedTimePeriodVar.value = "";
    } else {
      console.error("El medicamento seleccionado no se encontró en la tabla de medicamentos.");
    }
  }
};
const turnBack = () => {
    router.push(`/prescriptions`);
  };
</script>

<template>
  <div class="space-y-2">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <RouterLink to="/prescriptions">Inicio</RouterLink>
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
            <Textarea class="min-h-32" type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- medical record -->
      <FormField v-slot="{ componentField }" name="medical_record_id">
        <FormItem>
          <FormLabel>Consulta</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una consulta" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="record in medicalRecordsSelectValues" :key="record.key" :value="record.value">
                  {{ record.text }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- medicines -->
      <div class="flex gap-4">
        <div class="border-2 border-gray-300 p-2 rounded-sm">
          <h1 class="font-bold">Medicinas</h1>
          <p>Seleccione una medicina, dosis y tiempo</p>
          <div class="flex gap-2">
            <select class="border-2 border-gray-200 rounded-md p-2" v-model="selectedMedicineVar">
              <option v-for="medicine in medicinesSelectValues" :key="medicine.id" :value="medicine.id">
                {{ medicine.name }}
              </option>
            </select>
            <Input type="number" placeholder="Dosis" class="border-2 border-gray-200 rounded-md p-2" v-model="selectedDoseVar" />
            <Select v-model="selectedTimePeriodVar">
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="time in periodOfTimeSelectValues" :key="time.value" :value="time.value">
                    {{ time.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button class="bg-gray-500" type="button" @click="addNewMedicine()">Confirmar</Button>
          </div>
        </div>
        <div>
          <h1 class="font-semibold">Medicinas seleccionadas</h1>
          <ul>
            <li v-for="selected in selectedMedicineNames" :key="selected.medicine_name"
            class="border-2 border-gray-300 p-2 rounded-sm">{{ selected.medicine_name }}, Dosis: {{ selected.dose }}, Cada: {{ selected.timePeriod }}</li>
          </ul>
        </div>
      </div>
      <div class="flex gap-2">
        <Button type="submit">Guardar</Button>
        <Button type="button" class="bg-red-500" @click="turnBack">Cancelar</Button>
      </div>
    </form>
  </div>
</template>