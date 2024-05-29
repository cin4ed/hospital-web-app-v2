<script setup lang="ts">
import { useForm } from "vee-validate";
import axios from "@/lib/axios";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useRouter } from 'vue-router';
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
      name: z.string().regex(/^[a-zA-Z\s]+$/, {
        message: "El nombre solo puede contener letras y espacios",
      }),
      lastname: z.string().regex(/^[a-zA-Z\s]+$/, {
        message: "El nombre solo puede contener letras y espacios",
      }),
      birth_date: z.string(),
      curp: z.string().length(18, {
        message: "La CURP debe tener exactamente 18 caracteres",
      })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "La CURP solo puede contener letras y números",
      }),
      affiliation_date: z.string(),
      phone_number: z.string().length(10, {
        message: "El número de teléfono debe tener exactamente 10 dígitos",
      })
      .regex(/^\d{10}$/, {
        message: "El número de teléfono solo puede contener dígitos",
      }),
      blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    })
  );

  const form = useForm({
    validationSchema: formSchema,
  });

  const router = useRouter();
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await axios.post(`/patients`, values);
      toast.success('El paciente se ha creado con éxito');
      router.push(`/patients`);
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error('Ha ocurrido un error al intentar crear el paciente', {
          description: `${error.response.data.message}`,
        });
      } else {
        toast.error('Ha ocurrido un error desconocido al intentar crear el paciente');
      }
    }
  });
const turnBack = () => {
    router.push(`/patients`);
  };
</script>

<template>
  <div class="space-y-2">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <RouterLink to="/patients">Inicio</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/patients">
            <RouterLink to="/patients">Pacientes</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <h1 class="text-3xl font-semibold">Agrega un nuevo paciente</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- name -->
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Nombre del paciente"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- active ingredients -->
      <FormField v-slot="{ componentField }" name="lastname">
        <FormItem>
          <FormLabel>Apellidos</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Apellidos del paciente"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- dosage strength -->
      <FormField v-slot="{ componentField }" name="birth_date">
        <FormItem>
          <FormLabel>Fecha de nacimiento</FormLabel>
          <FormControl>
            <Input
                type="date"
                placeholder="500"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- dosage unit -->
      <FormField v-slot="{ componentField }" name="affiliation_date">
        <FormItem>
          <FormLabel>Fecha de afiliacion</FormLabel>
          <FormControl>
            <Input
                type="date"
                placeholder="mg"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="curp">
        <FormItem>
          <FormLabel>CURP del paciente</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="CURP"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- prescription info -->
      <FormField v-slot="{ componentField }" name="phone_number">
        <FormItem>
          <FormLabel>Número telefonico</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="placeholder"
                v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- presentation -->
      <FormField v-slot="{ componentField }" name="blood_type">
        <FormItem>
          <FormLabel>Tipo de sangre</FormLabel>
          <FormControl>
            <select v-bind="componentField">
              <option>Seleccione un tipo de sangre</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button type="button">Editar</Button>
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
                <span class="font-semibold">Fecha de nacimiento: </span><span>{{ form.values.birth_date }}</span><br>
                <span class="font-semibold">Fecha de afiliación: </span><span>{{ form.values.affiliation_date }}</span><br>
                <span class="font-semibold">CURP del paciente: </span><span>{{ form.values.curp }}</span><br>
                <span class="font-semibold">Número telefonico: </span><span>{{ form.values.phone_number }}</span><br>
                <span class="font-semibold">Tipo de sangre: </span><span>{{ form.values.blood_type }}</span><br>
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