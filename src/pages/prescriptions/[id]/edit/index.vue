<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref } from "vue";
  import { useRouter, useRoute } from 'vue-router';
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
import { TreeNodeValueStatic } from "unplugin-vue-router/types";

const route = useRoute();
const patientId = route.params.id;

const medicalRecordsSelectValues = ref([]);
const patientsSelectValues = ref([]);
const doctorsSelectValues = ref([]);
const medicinesSelectValues = ref([]);
const selectedMedicines = ref([]);
const selectedMedicineNames = ref([]);

const medicineData = ref([]);
const medical_record_id = ref(0)
const notes = ref('')
const date = ref('')

const fetchPatientData = async () => {
  try {
    const response = await axios.get(`/prescriptions/${patientId}`);
    medicineData.value = response.data;
    const doctorsRequest = await axios.get(`/doctors`);
    const medicinesRequest = await axios.get(`/medicines`);
    const patientsRequest = await axios.get(`/patients`);
    const doctorsTable = doctorsRequest.data;
    const patientsTable = patientsRequest.data;
    const medicinesTable = medicinesRequest.data;

    medical_record_id.value = medicineData.value.medical_record_id.toString();
    notes.value = medicineData.value.notes;
    date.value = medicineData.value.date;

    form.setValues({
      date: medicineData.value.date,
      notes: medicineData.value.notes,
      medical_record_id: medicineData.value.medical_record_id.toString(),
    });

    medicinesSelectValues.value = medicinesTable;

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
      id: `${record.id}`.toString(),
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
const onSubmit = form.handleSubmit((values) => {
  values.medical_record_id = parseInt(values.medical_record_id)

  values.medicines = selectedMedicines.value;
  console.log(values);
  axios.put(`/prescriptions/${patientId}`, values).then(() => {
    router.push(`/prescriptions`);
  });
});

const handleMedicineChange = (event) => {
  const medicineId = parseInt(event.target.value);
  if (!selectedMedicines.value.some(med => med.medicine_id === medicineId)) {
    selectedMedicines.value.push({
      medicine_id: medicineId,
      indications: 'x',
    });
    const medicine = medicinesSelectValues.value.find(m => m.id === medicineId);
    selectedMedicineNames.value.push(medicine.name);
  }
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
          <BreadcrumbPage>Editar</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Editar receta</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- date -->
      <FormField v-slot="{ componentField }" name="date">
        <FormItem>
          <FormLabel>Fecha de realización de la receta</FormLabel>
          <FormControl>
            <Input type="date" v-bind="componentField" v-model="date" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="notes">
        <FormItem>
          <FormLabel>Descripción de la receta</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" v-model="notes" />
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
                <SelectItem v-for="record in medicalRecordsSelectValues" :key="record.id" :value="record.id">
                  {{ record.text }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- medicines -->
      <div class="flex gap-52">
        <div>
          <h1 class="font-bold">Medicinas</h1>
          <p class="font-semibold text-xs">Seleccione una y se agregara a la lista automaticamente</p>
          <p class="font-semibold text-xs">Obligatorio seleccionar minimo 1 medicina*</p>
          <br>
          <select @change="handleMedicineChange" class="border-2 border-gray-200 rounded-md p-2">
            <option v-for="medicine in medicinesSelectValues" :key="medicine.id" :value="medicine.id">
              {{ medicine.name }}
            </option>
          </select>
        </div>
        <div>
          <h1 class="font-semibold">Medicinas seleccionadas</h1>
          <ul>
            <li v-for="name in selectedMedicineNames" :key="name">{{ name }}</li>
          </ul>
        </div>
      </div>
      <Button type="submit" >Guardar</Button>
    </form>
  </div>
</template>