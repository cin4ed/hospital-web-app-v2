<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
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
    name: z.string().regex(/^[a-zA-Z\s]+$/, {
      message: "El nombre solo puede contener letras y espacios",
    }),
    lastname: z.string().regex(/^[a-zA-Z\s]+$/, {
      message: "El apellido solo puede contener letras y espacios",
    }),
    speciality: z.string().regex(/^[a-zA-Z\s]+$/, {
      message: "La especialidad solo puede contener letras y espacios",
    }),
    admission_date: z.string(),
    professional_id: z.string(),
    phone_number: z.string().length(10, {
      message: "El número de teléfono debe tener exactamente 10 dígitos",
    })
    .regex(/^\d{10}$/, {
      message: "El número de teléfono solo puede contener dígitos",
    }),
    email: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

  const router = useRouter();
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      console.log(values);
      await axios.post(`/doctors/`, values);
      toast.success('Su registro se ha agregado con éxito');
      router.push(`/doctors`);
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
    router.push(`/doctors`);
  };
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
      <FormField v-slot="{ componentField }" name="lastname">
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
      <FormField v-slot="{ componentField }" name="speciality">
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
                <span class="font-semibold">Nombre: </span><span>{{ form.values.name }}</span><br>
                <span class="font-semibold">Apellido: </span><span>{{ form.values.lastname }}</span><br>
                <span class="font-semibold">Especialidad: </span><span>{{ form.values.speciality }}</span><br>
                <span class="font-semibold">Admisión: </span><span>{{ form.values.admission_date }}</span><br>
                <span class="font-semibold">Cédula: </span><span>{{ form.values.professional_id }}</span><br>
                <span class="font-semibold">Número de teléfono: </span><span>{{ form.values.phone_number }}</span><br>
                <span class="font-semibold">Correo electrónico: </span><span>{{ form.values.email }}</span><br>
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