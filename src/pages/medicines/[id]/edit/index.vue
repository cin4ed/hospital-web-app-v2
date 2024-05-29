<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useRouter, useRoute } from 'vue-router';
import axios from "@/lib/axios";
import { ref } from "vue";
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
  
  const fetchMedicineData = async () => {
    try {
      const response = await axios.get(`/medicines/${medicineId}`);
      const medicineData = response.data;

      console.log(medicineData)
      
      name.value = medicineData.name;
      active_ingredients.value = medicineData.active_ingredients;
      dosage_strength.value = medicineData.dosage_strength;
      dosage_unit.value = medicineData.dosage_unit;
      prescription_info.value = medicineData.prescription_info;
      presentation.value = medicineData.presentation;
      price.value = parseInt(medicineData.price);
      quantity_in_stock.value = medicineData.quantity_in_stock;
      supplier_name.value = medicineData.supplier_name;
      supplier_contact.value = parseInt(formatPhoneNumber(medicineData.supplier_contact));
      supplier_cost.value = medicineData.supplier_cost;
      description.value = medicineData.description;

      // Establecer los valores del formulario
      form.setValues({
        name: medicineData.name,
        active_ingredients: medicineData.active_ingredients,
        dosage_strength: parseInt(medicineData.dosage_strength),
        dosage_unit: medicineData.dosage_unit,
        prescription_info: medicineData.prescription_info,
        presentation: medicineData.presentation,
        price: parseInt(medicineData.price),
        quantity_in_stock: medicineData.quantity_in_stock,
        supplier_name: medicineData.supplier_name,
        supplier_contact: parseInt(formatPhoneNumber(medicineData.supplier_contact)),
        supplier_cost: parseInt(medicineData.supplier_cost),
        description: medicineData.description
      });
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };
  fetchMedicineData();

  const formatPhoneNumber = (phone: any) => {
    return phone.replace(/[^\d]/g, ''); // Elimina todos los caracteres no numéricos
  };

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().regex(/^[a-zA-Z\s]+$/, {
        message: "El nombre solo puede contener letras y espacios",
      }),
      active_ingredients: z.string().regex(/^[a-zA-Z\s]+$/, {
        message: "El nombre solo puede contener letras y espacios",
      }),
      dosage_strength: z.number(),
      dosage_unit: z.enum([
        'mg',
        'gr',
        'ml',
        'mcg',
        'drops'
      ]),
      prescription_info: z.string(),
      presentation: z.enum(["pill", "capsule", "syrup"]),
      price: z.number(),
      quantity_in_stock: z.number().int(),
      supplier_name: z.string().regex(/^[a-zA-Z\s]+$/, {
        message: "El nombre solo puede contener letras y espacios",
      }),
      supplier_contact: z.string().length(10, {
        message: "El número de teléfono debe tener exactamente 10 dígitos",
      })
      .regex(/^\d{10}$/, {
        message: "El número de teléfono solo puede contener dígitos",
      }),
      supplier_cost: z.number(),
      description: z.string().optional(),
    })
  );

  const dosageUnits = [
    { value: 'mg', text: 'Milligrams (mg)' },
    { value: 'gr', text: 'Grams (gr)' },
    { value: 'ml', text: 'Milliliters (ml)' },
    { value: 'mcg', text: 'Micrograms (mcg)' },
    { value: 'units', text: 'Units' },
    { value: 'tablets', text: 'Tablets' },
    { value: 'capsules', text: 'Capsules' },
    { value: 'drops', text: 'Drops' }
  ];

  const form = useForm({
    validationSchema: formSchema,
  });

  const router = useRouter();
  const onSubmit = form.handleSubmit(async (values) => {
    values.dosage_strength = values.dosage_strength.toString()
    values.supplier_contact = values.supplier_contact.toString()
    try {
      console.log(values);
      await axios.put(`/medicines/${medicineId}`, values);
      toast.success('Su registro se ha editado con éxito');
      router.push(`/medicines`);
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
    router.push(`/medicines`);
  };
</script>

<template>
  <div class="space-y-2">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <RouterLink to="/medicines">Inicio</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/medicines">
            <RouterLink to="/medicines">Medicamentos</RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Editar</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Editar una medicina</h1>
    <form @submit="onSubmit" class="space-y-4">
      <!-- name -->
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Aspirina"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription> El nombre de la medicina. </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- active ingredients -->
      <FormField v-slot="{ componentField }" name="active_ingredients">
        <FormItem>
          <FormLabel>Ingredientes activos</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Ácido acetilsalicílico"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Introduce los ingredientes activos.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- dosage strength -->
      <FormField v-slot="{ componentField }" name="dosage_strength">
        <FormItem>
          <FormLabel>Dósis</FormLabel>
          <FormControl>
            <Input
                type="number"
                placeholder="500"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Dosage strength.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- dosage unit -->
      <FormField v-slot="{ componentField }" name="dosage_unit">
        <FormItem>
          <FormLabel>Unidad</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una unidad" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="record in dosageUnits" :key="record.key" :value="record.value">
                  {{ record.text }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription>Dosage unit.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- prescription info -->
      <FormField v-slot="{ componentField }" name="prescription_info">
        <FormItem>
          <FormLabel>Información</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="placeholder"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Información de descripción</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- presentation -->
      <FormField v-slot="{ componentField }" name="presentation">
        <FormItem>
          <FormLabel>Presentación</FormLabel>
          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una presentación" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pill">
                  Cápsula
                </SelectItem>
                <SelectItem value="capsule">
                  Tableta
                </SelectItem>
                <SelectItem value="syrup">
                  Jarabe
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription>Presentación de la medicina.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- price -->
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Precio</FormLabel>
          <FormControl>
            <Input
                type="number"
                placeholder="100"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Precio de la medicina.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- quantity in stock -->
      <FormField v-slot="{ componentField }" name="quantity_in_stock">
        <FormItem>
          <FormLabel>Cantidad en stock</FormLabel>
          <FormControl>
            <Input
                type="number"
                placeholder="100"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Cantidad en stock.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- supplier name -->
      <FormField v-slot="{ componentField }" name="supplier_name">
        <FormItem>
          <FormLabel>Nombre del proveedor</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Farmacias Guadalajara"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Nombre del proveedor.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- supplier contact -->
      <FormField v-slot="{ componentField }" name="supplier_contact">
        <FormItem>
          <FormLabel>Contacto del proveedor</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="612902489"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Contacto del proveedor.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- supplier cost -->
      <FormField v-slot="{ componentField }" name="supplier_cost">
        <FormItem>
          <FormLabel>Costo del proveedor</FormLabel>
          <FormControl>
            <Input
                type="number"
                placeholder="100"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Costo del proveedor.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <!-- description -->
      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Descripción</FormLabel>
          <FormControl>
            <Input
                type="text"
                placeholder="Descripción de la medicina"
                v-bind="componentField"
            />
          </FormControl>
          <FormDescription>Descripción de la medicina.</FormDescription>
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
              <AlertDialogTitle>¿Estás completamente seguro de querer editar este registro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción solo puede deshacerse volviendo a editar el elemento. Debes asegurarte de que todos los datos 
                son capturados de manera correcta para evitar cualquier inconveniente a la hora de utilizar la información.
              </AlertDialogDescription>
              <p class="text-black font-semibold text-lg">Datos del elemento:</p>
              <div class="overflow-auto max-h-96">
                <span class="font-semibold">Nombre: </span><span>{{ form.values.name }}</span><br>
                <span class="font-semibold">Ingredientes Activos: </span><span>{{ form.values.active_ingredients }}</span><br>
                <span class="font-semibold">Dósis: </span><span>{{ form.values.dosage_strength }}</span><br>
                <span class="font-semibold">Unidad: </span><span>{{ form.values.dosage_unit }}</span><br>
                <span class="font-semibold">Información: </span><span>{{ form.values.prescription_info }}</span><br>
                <span class="font-semibold">Presentación: </span><span>{{ form.values.presentation }}</span><br>
                <span class="font-semibold">Precio: </span><span>{{ form.values.price }}</span><br>
                <span class="font-semibold">Cantidad en Stock: </span><span>{{ form.values.quantity_in_stock }}</span><br>
                <span class="font-semibold">Nombre del proveedor: </span><span>{{ form.values.supplier_name }}</span><br>
                <span class="font-semibold">Contacto del proveedor: </span><span>{{ form.values.supplier_contact }}</span><br>
                <span class="font-semibold">Costo del proveedor: </span><span>{{ form.values.supplier_cost }}</span><br>
                <span class="font-semibold">Descripción: </span><span>{{ form.values.description }}</span><br>
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
