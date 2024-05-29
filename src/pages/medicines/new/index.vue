<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
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

  const formSchema = toTypedSchema(
    z.object({
      name: z.string(),
      active_ingredients: z.string(),
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
      supplier_name: z.string(),
      supplier_contact: z.string(),
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
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    values.dosage_strength = values.dosage_strength.toString();
    values.price = values.price.toString();
    axios.post(`/medicines/`, values);
    router.push(`/medicines`);
  });
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
          <BreadcrumbPage>Nuevo</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <h1 class="text-3xl font-semibold">Agrega una nueva medicina</h1>
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
                placeholder="ABC Pharmaceuticals"
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
      <Button type="submit">Guardar</Button>
    </form>
  </div>
</template>
