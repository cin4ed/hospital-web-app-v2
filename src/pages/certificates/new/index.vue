<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import axios from "@/lib/axios";
import { ref, onMounted } from "vue";
import { toast } from 'vue-sonner';
import { useRouter, useRoute } from 'vue-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog'

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

const router = useRouter();
const onSubmit = form.handleSubmit(async (values) => {
  try {
    console.log(values);
    await axios.post(`/medical-certificates/`, values);
    toast.success('Su registro se ha agregado con éxito');
    router.push(`/certificates`);
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
const turnBack = () => {
    router.push(`/certificates`);
  };

  const getDoctorName = (doctorId) => {
      const doctor = doctorsSelectValues.value.find(d => d.value === doctorId);
      return doctor ? doctor.text : 'Desconocido';
    };

    const getPatientName = (patientId) => {
      const patient = patientsSelectValues.value.find(p => p.value === patientId);
      return patient ? patient.text : 'Desconocido';
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
        <AlertDialog>
          <AlertDialogTrigger>
            <Button type="button">Guardar</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estas completamente seguro de querer añadir este registro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción solo puede deshacerse eliminando por completo el elemento una vez añadido o 
                editandolo, sin embargo, debe de asegurar de que todos los datos son capturados de manera
                correcta para evitar cualquier inconveniente a la hora de utilizar la información.
              </AlertDialogDescription>
              <p class="text-black font-semibold text-lg">Datos del elemento:</p>
              <div class="overflow-auto max-h-96">
                <span class="font-semibold">Fecha de emisión del certificado: </span><span>{{ form.values.date }}</span><br>
                <span class="font-semibold">Doctor involucrado: </span><span>{{ getDoctorName(form.values.doctor_id) }}</span><br>
                <span class="font-semibold">Paciente involucrado: </span><span>{{ getPatientName(form.values.patient_id) }}</span><br>
                <span class="font-semibold">Edad actual del paciente: </span><span>{{ form.values.age }}</span><br>
                <span class="font-semibold">Altura actual del paciente: </span><span>{{ form.values.height }}</span><br>
                <span class="font-semibold">Peso actual del paciente: </span><span>{{ form.values.weight }}</span><br>
                <span class="font-semibold">Presión sistólica: </span><span>{{ form.values.systolic_pressure }}</span><br>
                <span class="font-semibold">Presión diastólica: </span><span>{{ form.values.diastolic_pressure }}</span><br>
                <span class="font-semibold">Ritmo cárdiaco: </span><span>{{ form.values.heart_rate }}</span><br>
                <span class="font-semibold">Ritmo respiratorio: </span><span>{{ form.values.respiratory_rate }}</span><br>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>
                <Button type="submit" @click="onSubmit">Confirmar</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button type="button" class="bg-red-500" @click="turnBack">Cancelar</Button>
      </div>
    </form>
  </div>
</template>