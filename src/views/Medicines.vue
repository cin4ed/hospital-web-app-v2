<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";

import { ref, onMounted } from "vue";
import { columns } from "@/lib/medicines/columns";
import type { Medicine } from "@/lib/medicines/columns";
import DataTable from "@/components/ui/data-table.vue";

const data = ref<Medicine[]>([]);

async function getData(): Promise<Medicine[]> {
  return [
    {
      "id": 1,
      "name": "Aspirin",
      "active_ingredients": "Acetylsalicylic acid",
      "dosage_strength": "325 mg",
      "dosage_unit": "mg",
      "prescription_info": "Pain relief, anti-inflammatory",
      "type": "Tablet",
      "price": 5.99,
      "quantity_in_stock": 500,
      "supplier_name": "ABC Pharmaceuticals",
      "supplier_contact": "123-456-7890",
      "supplier_cost": 3.50
    },
    {
      "id": 2,
      "name": "Amoxicillin",
      "active_ingredients": "Amoxicillin",
      "dosage_strength": "500 mg",
      "dosage_unit": "mg",
      "prescription_info": "Antibiotic",
      "type": "Capsule",
      "price": 12.50,
      "quantity_in_stock": 300,
      "supplier_name": "XYZ Pharma",
      "supplier_contact": "987-654-3210",
      "supplier_cost": 8.75
    },
    {
      "id": 3,
      "name": "Loratadine",
      "active_ingredients": "Loratadine",
      "dosage_strength": "10 mg",
      "dosage_unit": "mg",
      "prescription_info": "Antihistamine",
      "type": "Tablet",
      "price": 9.99,
      "quantity_in_stock": 200,
      "supplier_name": "PharmaCorp",
      "supplier_contact": "555-123-4567",
      "supplier_cost": 6.25
    }
  ];
}

 onMounted(async () => {
   data.value = await getData();
 });
</script>

<template>
  <div class="space-y-4">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Medicamentos</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="flex justify-between">
      <div class="flex gap-3">
        <Button class="space-x-2">
          <Plus class="w-5 h-5" />
          <a href="/medicines/new"> Agregar </a>
        </Button>
      </div>
    </div>
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
