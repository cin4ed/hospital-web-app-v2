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

const date = ref('')
const notes = ref('')

const formatPhoneNumber = (phone: any) => {
  return phone.replace(/[^\d]/g, ''); // Elimina todos los caracteres no numéricos
};

const route = useRoute();
const doctorId = route.params.id;

const fetchPatientData = async () => {
  try {
    const response = await axios.get(`/doctors/${doctorId}`);
    const doctorData = response.data;
    console.log(doctorData)
    
    // Asignar valores a las variables reactivas
    date.value = doctorData.date;
    notes.value = doctorData.notes;

    // Establecer los valores del formulario
    form.setValues({
      date: doctorData.date,
      notes: doctorData.notes,
    });
  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
};
fetchPatientData();

const formSchema = toTypedSchema(
  z.object({
        apointment_date: z.date(),
        name_paciente: z.string(),
        name_doctor: z.string(),
        notes: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const router = useRouter();
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    axios.put(`/doctors/${doctorId}`, values);
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
          <BreadcrumbLink href="/prescriptions">
            <RouterLink to="/prescriptions">Recetas</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Ver</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Información receta</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- date -->
      <FormField v-slot="{ componentField }" name="apointment_date">
        <FormItem>
          <FormLabel>Fecha de realización de la receta</FormLabel>
          <FormControl>
            <Input
              type="date"
              v-bind="componentField"
              disabled
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
            <Input
              type="text"
              placeholder="John"
              v-bind="componentField"
              disabled
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- name -->
      <FormField v-slot="{ componentField }" name="patient_name">
        <FormItem>
          <FormLabel>Nombre del paciente</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Francis"
              v-bind="componentField"
              disabled
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    <!-- name -->
    <FormField v-slot="{ componentField }" name="notes">
      <FormItem>
        <FormLabel>Notas de receta</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Tomar cada 8 horas..."
            v-bind="componentField"
            disabled
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
      <Button type="submit">Regresar</Button>
    </form>
  </div>
</template>