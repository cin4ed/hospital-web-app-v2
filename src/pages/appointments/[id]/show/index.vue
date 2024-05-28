<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import axios from "@/lib/axios";

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
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const doctorsSelectValues = ref([])
const patientsSelectValues = ref([])
const route = useRoute();
const appointmentId = route.params.id;

const datetime = ref('')
const doctor_id = ref(0)
const patient_id = ref(0)

const fetchPatientData = async () => {
  try {
    const response = await axios.get(`/medical-records/${appointmentId}`);
    const appointmenData = response.data;

    datetime.value = appointmenData.datetime;
    doctor_id.value = appointmenData.doctor_id.toString();
    patient_id.value = appointmenData.patient_id.toString();

    const date = new Date(datetime.value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    datetime.value = `${year}-${month}-${day} ${hours}:${minutes}`;

    form.setValues({
      datetime: datetime.value,
      doctor_id: appointmenData.doctor_id.toString(),
      patient_id: appointmenData.patient_id.toString()
    });

    const doctorsRequest = await axios.get(`/doctors`);
    const patientsRequest = await axios.get(`/patients`);
    const doctorsTable = doctorsRequest.data;
    const patientsTable = patientsRequest.data;

    doctorsSelectValues.value = doctorsTable.map(doctor => ({
      value: doctor.id.toString(),
      text: doctor.name,
    }));

    patientsSelectValues.value = patientsTable.map(patient => ({
      value: patient.id.toString(),
      text: patient.name,
    }));
    
  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
};
fetchPatientData();

const formSchema = toTypedSchema(
  z.object({
        datetime: z.string(),
        patient_id: z.string(),
        doctor_id: z.string()
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const router = useRouter();
  
const goBack = () => {
  router.push(`/appointments`);
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
          <BreadcrumbLink href="/apointments">
            <RouterLink to="/apointments">Citas</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Visualizar cita</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- date -->
      <FormField v-slot="{ componentField }" name="datetime">
        <FormItem>
          <FormLabel>Fecha de la cita</FormLabel>
          <FormControl>
            <Input
              type="datetime-local"
              v-bind="componentField"
              disabled
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- name -->
      <FormField v-slot="{ componentField }" name="doctor_id">
        <FormItem>
          <FormLabel>Nombre del doctor</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger disabled>
                <SelectValue placeholder="Seleccione una unidad" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="doctor in doctorsSelectValues" :key="doctor.id" :value="doctor.value">
                  {{ doctor.text }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- name -->
      <FormField v-slot="{ componentField }" name="patient_id">
        <FormItem>
          <FormLabel>Nombre del paciente</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger disabled>
                <SelectValue placeholder="Seleccione una unidad" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="patient in patientsSelectValues" :key="patient.id" :value="patient.value">
                  {{ patient.text }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="button" @click="goBack">Regresar</Button>
    </form>
  </div>
</template>