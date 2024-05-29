<script setup lang="ts">
  import { useForm } from "vee-validate";
  import axios from "@/lib/axios";
  import { toTypedSchema } from "@vee-validate/zod";
  import * as z from "zod";
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from "vue";

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
  
  const route = useRoute();
  const patientId = route.params.id;
  const patientData = ref([])
  const response = axios.get(`/patients/${patientId}`);
  
  /* Variables a rellenar del formulario */
  const name = ref('')
  const lastname = ref('')
  const birth_date = ref('')
  const affiliation_date = ref('')
  const phone_number = ref(0)
  const blood_type = ref(0)
  const curp = ref(0)
  const bloodTypeEnum = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`/patients/${patientId}`);
      patientData.value = response.data;
      name.value = patientData.value.name
      lastname.value = patientData.value.lastname
      birth_date.value = patientData.value.birth_date
      affiliation_date.value = patientData.value.affiliation_date
      phone_number.value = formatPhoneNumber(patientData.value.phone_number);
      blood_type.value = patientData.value.blood_type;
      curp.value = patientData.value.curp
      form.setValues({
        name: patientData.value.name,
        lastname: patientData.value.lastname,
        birth_date: patientData.value.birth_date,
        affiliation_date: patientData.value.affiliation_date,
        phone_number: (formatPhoneNumber(patientData.value.phone_number)),
        blood_type: patientData.value.blood_type,
        curp: patientData.value.curp
      });
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  fetchPatientData();

  const formatPhoneNumber = (phone) => {
    return phone.replace(/[^\d]/g, ''); // Elimina todos los caracteres no numéricos
  };

  const formSchema = toTypedSchema(
  z.object({
      name: z.string(),
      lastname: z.string(),
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
  const onSubmit = form.handleSubmit((values) => {
    values.phone_number = values.phone_number.toString()
    axios.put(`/patients/${patientId}`, values);
    router.push(`/patients`);
  });
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
          <BreadcrumbLink>
            <RouterLink to="/patients">Pacientes</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <h1 class="text-3xl font-semibold">Edita un paciente</h1>
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
              v-model="name"
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
                v-model="lastname"
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
                v-model="birth_date"
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
                v-model="affiliation_date"
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
                v-model="phone_number"
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
      <Button type="submit">Guardar</Button>
    </form>
  </div>
</template>
