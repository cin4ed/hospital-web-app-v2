<script setup lang="ts">
import { useForm } from "vee-validate";
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
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

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

const onSubmit = form.handleSubmit((values) => {
  console.log(values);
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
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Registrar receta</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- date -->
      <FormField v-slot="{ componentField }" name="apointment_date">
        <FormItem>
          <FormLabel>Fecha de realización de la receta</FormLabel>
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
            <Input
              type="text"
              placeholder="John"
              v-bind="componentField"
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
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
      <Button type="submit">Guardar</Button>
    </form>
  </div>
</template>