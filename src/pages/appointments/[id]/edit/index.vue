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

const apointment_date = ref('')
const doctor = ref(0)
const patient = ref(0)

const route = useRoute();
const doctorId = route.params.id;

const doctorsSelectValues = ref([])
const patientsSelectValues = ref([])
const fetchPatientData = async () => {
  try {
    const response = await axios.get(`/medical-records/${doctorId}`);
    const appointmentData = response.data;

    console.log(appointmentData)

    const doctorsRequest = await axios.get(`/doctors`);
    const patientsRequest = await axios.get(`/patients`);
    const doctorsTable = doctorsRequest.data;
    const patientsTable = patientsRequest.data;

    // Asignar valores a las variables reactivas
    apointment_date.value = appointmentData.datetime;
    doctor.value = appointmentData.doctor_id;
    patient.value = appointmentData.patient_id;

    // Establecer los valores del formulario
    form.setValues({
      apointment_date: appointmentData.datetime,
      patient_name: appointmentData.doctor_id,
      doctor_name: appointmentData.patient_id,
    });

    doctorsSelectValues.value = doctorsTable.map(doctor => ({
      value: doctor.id,
      text: doctor.name,
    }));

    patientsSelectValues.value = patientsTable.map(patient => ({
      value: patient.id,
      text: patient.name,
    }));
    
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
    axios.post(`/doctors/`, values);
    router.push(`/doctors`);
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
    <h1 class="text-3xl font-semibold">Editar cita</h1>
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