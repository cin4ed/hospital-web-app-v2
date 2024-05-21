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

        date: z.date(),
        name_paciente: z.string(),
        name_doctor: z.string(),
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
      <FormField v-slot="{ componentField }" name="age">
        <FormItem>
          <FormLabel>Edad del paciente</FormLabel>
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
          <FormLabel>Altura del paciente</FormLabel>
          <FormControl>
            <Input
              type="any"
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
          <FormLabel>Peso del paciente</FormLabel>
          <FormControl>
            <Input
              type="any"
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
             type="any"
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
              type="any"
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
              type="any"
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
              type="any"
              placeholder="100"
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