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
  const medicineId = route.params.id;
  const medicineData = ref([])
  
  /* Variables a rellenar del formulario */
  const name = ref('')
  const active_ingredients = ref('')
  const dosage_strength = ref(0)
  const dosage_unit = ref(0)
  const prescription_info = ref('')
  const presentation = ref('')
  const price = ref(0);
  const quantity_in_stock = ref(0);
  const supplier_name = ref('');
  const supplier_contact = ref(0);
  const supplier_cost = ref(0);
  const description = ref('');

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`/medicines/${medicineId}`);
      const patientData = response.data;
      
      // Asignar valores a las variables reactivas
      name.value = patientData.name;
      active_ingredients.value = patientData.active_ingredients;
      dosage_strength.value = patientData.dosage_strength;
      dosage_unit.value = patientData.dosage_unit;
      prescription_info.value = patientData.prescription_info;
      presentation.value = patientData.presentation;
      price.value = patientData.price;
      quantity_in_stock.value = patientData.quantity_in_stock;
      supplier_name.value = patientData.supplier_name;
      supplier_contact.value = parseInt(formatPhoneNumber(patientData.supplier_contact));
      supplier_cost.value = patientData.supplier_cost;
      description.value = patientData.description;

      // Establecer los valores del formulario
      form.setValues({
        name: patientData.name,
        active_ingredients: patientData.active_ingredients,
        dosage_strength: parseInt(patientData.dosage_strength),
        dosage_unit: patientData.dosage_unit,
        prescription_info: patientData.prescription_info,
        presentation: patientData.presentation,
        price: parseInt(patientData.price),
        quantity_in_stock: patientData.quantity_in_stock,
        supplier_name: patientData.supplier_name,
        supplier_contact: parseInt(formatPhoneNumber(patientData.supplier_contact)),
        supplier_cost: parseInt(patientData.supplier_cost),
        description: patientData.description
      });
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  fetchPatientData();

  const formatPhoneNumber = (phone: any) => {
    return phone.replace(/[^\d]/g, ''); // Elimina todos los caracteres no numéricos
  };

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
      active_ingredients: z.string(),
      dosage_strength: z.number(),
      dosage_unit: z.string(),
      prescription_info: z.string(),
      presentation: z.enum(["Capsula", "Tableta", "Jarabe"]),
      price: z.number(),
      quantity_in_stock: z.number(),
      supplier_name: z.string(),
      supplier_contact: z.number(),
      supplier_cost: z.number(),
      description: z.string()
    })
  );

  const form = useForm({
    validationSchema: formSchema,
  });

  const router = useRouter();
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    axios.put(`/patients`, values);
    router.push(`/patients`);
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
          <BreadcrumbLink>
            <RouterLink to="/patients">Medicinas</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <h1 class="text-3xl font-semibold">Edita una medicina</h1>
    <form @submit.prevent="onSubmit" class="space-y-4">
      <!-- name -->
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input
              type="text"
              v-bind="componentField"
              v-model="name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- active ingredients -->
      <FormField v-slot="{ componentField }" name="active_ingredients">
        <FormItem>
          <FormLabel>Ingredientes Activos</FormLabel>
          <FormControl>
            <Input
                type="text"
                v-bind="componentField"
                v-model="active_ingredients"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- dosage strength -->
      <FormField v-slot="{ componentField }" name="dosage_strength">
        <FormItem>
          <FormLabel>Fuerza de la dosis</FormLabel>
          <FormControl>
            <Input
                type="number"
                v-bind="componentField"
                v-model="dosage_strength"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- dosage unit -->
      <FormField v-slot="{ componentField }" name="dosage_unit">
        <FormItem>
          <FormLabel>Medicion de la dosis</FormLabel>
          <FormControl>
            <Input
                type="text"
                v-bind="componentField"
                v-model="dosage_unit"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- prescription info -->
      <FormField v-slot="{ componentField }" name="prescription_info">
        <FormItem>
          <FormLabel>Informacion de la preescripcion</FormLabel>
          <FormControl>
            <Input
                type="text"
                v-bind="componentField"
                v-model="prescription_info"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- presentation -->
      <FormField v-slot="{ componentField }" name="presentation">
        <FormItem>
          <FormLabel>Forma de presentacion</FormLabel>
          <FormControl>
            <select v-bind="componentField" v-model="presentation">
              <option value="Capsula">Capsula</option>
              <option value="Tableta">Tableta</option>
              <option value="Jarabe">Jarabe</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Precio</FormLabel>
          <FormControl>
            <Input
                type="number"
                v-bind="componentField"
                v-model="price"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="quantity_in_stock">
        <FormItem>
          <FormLabel>Cantidad en stock</FormLabel>
          <FormControl>
            <Input
                type="number"
                v-bind="componentField"
                v-model="quantity_in_stock"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="supplier_name">
        <FormItem>
          <FormLabel>Nombre del proveedor</FormLabel>
          <FormControl>
            <Input
                type="text"
                v-bind="componentField"
                v-model="supplier_name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="supplier_contact">
        <FormItem>
          <FormLabel>Contacto del proveedor</FormLabel>
          <FormControl>
            <Input
                type="number"
                v-bind="componentField"
                v-model="supplier_contact"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="supplier_cost">
        <FormItem>
          <FormLabel>Costo del proveedor</FormLabel>
          <FormControl>
            <Input
                type="number"
                v-bind="componentField"
                v-model="supplier_cost"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Descripcion</FormLabel>
          <FormControl>
            <Input
                type="text"
                v-bind="componentField"
                v-model="description"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">Guardar</Button>
    </form>
  </div>
</template>
