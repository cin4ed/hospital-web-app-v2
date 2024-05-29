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
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const name = ref('')
const lastname = ref('')
const speciality = ref(0)
const admission_date = ref(0)
const professional_id = ref('')
const phone_number = ref('')
const email = ref(0);

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
    name.value = doctorData.name;
    lastname.value = doctorData.lastname;
    speciality.value = doctorData.speciality;
    admission_date.value = doctorData.admission_date;
    professional_id.value = doctorData.professional_id;
    phone_number.value = formatPhoneNumber(doctorData.phone_number).toString();
    email.value = doctorData.email;

    // Establecer los valores del formulario
    form.setValues({
      name: doctorData.name,
      lastname: doctorData.lastname,
      speciality: doctorData.speciality,
      admission_date: doctorData.admission_date,
      professional_id: doctorData.professional_id,
      phone_number: parseInt(formatPhoneNumber(doctorData.phone_number)).toString(),
      email: doctorData.email,
    });
  } catch (error) {
    console.error('Error fetching patient data:', error);
  }
};
fetchPatientData();

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
      await axios.put(`/doctors/${doctorId}`, values);
      toast.success('Su registro se ha editado con éxito');
      router.push(`/doctors`);
    } catch (error) {
      console.error("Error al editar el doctor:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error('Ha ocurrido un error al intentar editar su registro', {
          description: `${error.response.data.message}`,
        });
      } else {
        toast.error('Ha ocurrido un error desconocido al intentar editar su registro');
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
          <BreadcrumbPage>Editar</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Edita un doctor</h1>
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
              v-model="name"
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
                v-model="lastname"
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
                v-model="speciality"
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
                v-bind="componentField"
                v-model="admission_date"
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
                v-model="professional_id"
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
                v-model="phone_number"
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
                v-model="email"
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