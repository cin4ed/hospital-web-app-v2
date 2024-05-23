<script setup lang="ts">
import axios from "@/lib/axios";
import { ref, onMounted } from "vue";
import type { Doctor } from "./columns.ts";

import { columns } from "@/pages/doctors/columns.ts";
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
import { Plus, Info } from "lucide-vue-next";


const doctors = ref<Doctor[]>([]);

async function fetchData(): Promise<void> {
  try {
    const response = await axios.get('/doctors');
    doctors.value = response.data;
  } catch (err) {
    console.error('Error fetching data: ', err);
  }
}

onMounted(fetchData);
fetchData();
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
          <BreadcrumbPage>Doctores</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
		<div>
    	<div class="flex items-end justify-between">
				<h1 class="text-3xl font-semibold">Doctores</h1>
    	  <RouterLink to='/doctors/new'>
          <Button class="space-x-2">
            <Plus class="w-5 h-5" />
            <span>Nuevo</span>
          </Button>
    	  </RouterLink>
    	</div>
      <!-- Descripción de la pagina  -->
      <div class="text-gray-600 flex items-center gap-4 mt-4 text-sm mb-2 p-4 border border-gray-200 rounded shadow-sm bg-blue-50 w-1/3">
        <div><Info class="w-5 h-5"></Info></div>
        <div>
          <p>
            En esta sección, puedes explorar todos los registros de doctores en nuestro sistema hasta la fecha.
          </p>
        </div>
      </div>
    	<DataTable :columns="columns" :data="doctors" search-placeholder="Buscar por nombre del doctor..." search-by="name" />
		</div>
  </div>
</template>
