<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router';
import axios from "@/lib/axios";
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
const onSubmit = form.handleSubmit(async (values) => {
  try {
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
    await axios.post(`/medical-records/`, values);
    toast.success('Su registro se ha agregado con éxito');
    router.push(`/appointments`);
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
    router.push(`/appointments`);
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
            <RouterLink to="/appointments">Inicio</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/appointments">
            <RouterLink to="/appointments">Citas</RouterLink>
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
      <div class="flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button type="button">Crear</Button>
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
                <span class="font-semibold">Nombre: </span><span>{{ form.values.datetime }}</span><br>
                <span class="font-semibold">Nombre del doctor: </span><span>{{ getDoctorName(form.values.doctor_id) }}</span><br>
                <span class="font-semibold">Nombre del paciente: </span><span>{{ getPatientName(form.values.patient_id) }}</span><br>
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