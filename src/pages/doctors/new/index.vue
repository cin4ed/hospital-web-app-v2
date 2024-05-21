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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    last_name: z.string(),
    specialty: z.string(),
    dadmission_date: z.date(),
    professional_id: z.string(),
    phone_number: z.string(),
    email: z.string(),
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
          <BreadcrumbLink href="/doctors">
            <RouterLink to="/doctors">Doctores</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Agrega un nuevo doctor</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- name -->
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
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
      <!-- apellido -->
      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem>
          <FormLabel>Apellido</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Smith"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- especialidad -->
      <FormField v-slot="{ componentField }" name="specialty">
        <FormItem>
          <FormLabel>Especialidad</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Neuro"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- fecha de admisión-->
      <FormField v-slot="{ componentField }" name="admission_date">
        <FormItem>
          <FormLabel>Admisión</FormLabel>
          <FormControl>
            <Input
                type="date"
                placeholder="2000-00-00"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- cedula-->
      <FormField v-slot="{ componentField }" name="professional_id">
        <FormItem>
          <FormLabel>Cédula</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Cédula profesional"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
       <!-- numero de telefono -->
      <FormField v-slot="{ componentField }" name="phone_number">
        <FormItem>
          <FormLabel>Número de teléfono</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Teléfono"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField> 
      <!-- email-->
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Correo electrónico</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Correo"
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