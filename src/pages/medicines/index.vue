<script setup lang="ts">
import axios from "@/lib/axios";
import { ref, onMounted } from "vue";
import type { Medicine } from "./columns.ts";

import { columns } from "@/pages/medicines/columns.ts";
import DataTable from "@/components/ui/data-table.vue";

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

const medicines = ref<Medicine[]>([]);

async function fetchData(): Promise<void> {
  try {
    const response = await axios.get('/medicines');
    medicines.value = response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
  }
}

onMounted(fetchData);
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
    <DataTable :columns="columns" :data="medicines" />
  </div>
</template>
