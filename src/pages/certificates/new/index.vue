<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "@/lib/axios";
import { ref, onMounted } from "vue";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import type { Doctor } from "../doctors/columns.ts";
import type { Patient } from "../patients/columns.ts";

const doctorsSelectValues = ref([])
const patientsSelectValues = ref([])
async function fetchData(): Promise<void> {
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

  } catch (err) {
    console.error('Error fetching data: ', err);
  }
}

onMounted(fetchData);

const formSchema = toTypedSchema(
  z.object({
        date: z.string(),
        patient_id: z.string(),
        doctor_id: z.string(),
        age: z.number(),
        height: z.number(),
        weight: z.number(),
        systolic_pressure: z.number(),
        diastolic_pressure: z.number(),
        heart_rate: z.number(),
        respiratory_rate: z.number(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
  axios.post(`/medical-certificates/`, values)
    .then(response => {
      console.log('Datos enviados con éxito:', response.data);
      /* router.push(`/appointments`); */
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
    });
});
const turnBack = () => {
    router.push(`/certificates`);
  };
</script>

<template>
  <div class="space-y-2">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <RouterLink to="/certificates">Inicio</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/certificates">
            <RouterLink to="/certificates">Certificados</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Generar certificado</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">

      <!-- date -->
      <FormField v-slot="{ componentField }" name="date">
        <FormItem>
          <FormLabel>Fecha de emisión del certificado</FormLabel>
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
      <br>
      <FormField v-slot="{ componentField }" name="doctor_id">
        <Select v-bind="componentField">
          <FormLabel>Doctor involucrado</FormLabel>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un doctor" />
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
      </FormField>
      <!-- name -->
      <br>
      <FormField v-slot="{ componentField }" name="patient_id">
        <Select v-bind="componentField">
          <FormLabel>Paciente involucrado</FormLabel>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione un paciente" />
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
      </FormField>
      <!-- name -->
      <FormField v-slot="{ componentField }" name="age">
        <FormItem>
          <FormLabel>Edad actual del paciente</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="10"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <!-- name -->
      <FormField v-slot="{ componentField }" name="height">
        <FormItem>
          <FormLabel>Altura actual del paciente</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="1.70"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
       <!-- name -->
       <FormField v-slot="{ componentField }" name="weight">
        <FormItem>
          <FormLabel>Peso actual del paciente</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="80.70"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>    
    <!-- name -->
      <FormField v-slot="{ componentField }" name="systolic_pressure">
       <FormItem>
         <FormLabel>Presión sistólica</FormLabel>
         <FormControl>
           <Input
             type="number"
             placeholder="100"
             v-bind="componentField"
           />
         </FormControl>
         <FormMessage />
       </FormItem>
     </FormField>
      <!-- name -->
      <FormField v-slot="{ componentField }" name="diastolic_pressure">
        <FormItem>
          <FormLabel>Presión diastólica</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="100"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
       <!-- name -->
       <FormField v-slot="{ componentField }" name="heart_rate">
        <FormItem>
          <FormLabel>Ritmo cárdiaco</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="100"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
       <!-- name -->
       <FormField v-slot="{ componentField }" name="respiratory_rate">
        <FormItem>
          <FormLabel>Ritmo respiratorio</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="100"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex gap-2">
        <Button type="submit">Guardar</Button>
        <Button type="button" class="bg-red-500" @click="turnBack">Cancelar</Button>
      </div>
    </form>
  </div>
</template>