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

    doctorsSelectValues.value = [{
      value: '',
      text: 'Por favor selecciona un doctor'
    }].concat(doctorsTable.map(doctor => ({
      value: doctor.id,
      text: doctor.name,
    })));
    
    patientsSelectValues.value = [{
      value: '',
      text: 'Por favor selecciona un paciente'
    }].concat(patientsTable.map(patient => ({
      value: patient.id,
      text: patient.name,
    })));

    console.log(doctorsTable)
    console.log(patientsTable)
    
  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
};
fetchPatientData();

const formSchema = toTypedSchema(
  z.object({
        apointment_date: z.string(),
        patient_name: z.number(),
        doctor_name: z.number()
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const router = useRouter();
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    axios.post(`/appointments/`, values);
    router.push(`/appointments`);
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
      <FormField v-slot="{ componentField }" name="apointment_date">
        <FormItem>
          <FormLabel>Fecha de la cita</FormLabel>
          <FormControl>
            <Input
              type="date"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- name -->
      <FormField v-slot="{ componentField }" name="doctor_name">
        <FormItem>
          <FormLabel>Nombre del doctor</FormLabel>
          <FormControl>
            <select v-bind="componentField">
              <option v-for="doctor in doctorsSelectValues" :key="doctor.value" :value="doctor.value">
                {{ doctor.text }}
              </option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- name -->
      <FormField v-slot="{ componentField }" name="patient_name">
        <FormItem>
          <FormLabel>Nombre del paciente</FormLabel>
          <FormControl>
            <select v-bind="componentField">
              <option v-for="patient in patientsSelectValues" :key="patient.value" :value="patient.value">
                {{ patient.text }}
              </option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">Guardar</Button>
    </form>
  </div>
</template>