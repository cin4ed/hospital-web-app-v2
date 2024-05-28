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
const fetchPatientData = async () => {
  try {
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
const onSubmit = form.handleSubmit((values) => {
  values.patient_id = parseInt(values.patient_id);
  values.doctor_id = parseInt(values.doctor_id);
  if (values.datetime) {
    const date = new Date(values.datetime);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    values.datetime = `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  
  console.log(values);
  axios.post(`/medical-records/`, values)
    .then(response => {
      console.log('Datos enviados con éxito:', response.data);
      router.push(`/appointments`);
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
    });
});
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
    <h1 class="text-3xl font-semibold">Registrar cita</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- date -->
      <FormField v-slot="{ componentField }" name="datetime">
        <FormItem>
          <FormLabel>Fecha de la cita</FormLabel>
          <FormControl>
            <Input
              type="datetime-local"
              v-bind="componentField"
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
              <SelectTrigger>
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
              <SelectTrigger>
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
      <Button type="submit">Guardar</Button>
    </form>
  </div>
</template>