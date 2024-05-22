<script setup lang="ts">
  import axios from "@/lib/axios";
  import { ref, onMounted } from "vue";
  import type { Patient } from "./columns.ts";

  import { columns } from "@/pages/patients/columns.ts";
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

  const Patients = ref<Patient[]>([]);

  async function fetchData(): Promise<void> {
    try {
      const response = await axios.get('/patients');
      Patients.value = response.data;
      console.log(Patients.value)
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
          <BreadcrumbPage>Pacientes</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
		<div>
    	<div class="flex items-end justify-between">
				<h1 class="text-3xl font-semibold">Pacientes</h1>
    	  <RouterLink to='/Patients/new'>
          <Button class="space-x-2">
            <Plus class="w-5 h-5" />
            <span>Nueva</span>
          </Button>
    	  </RouterLink>
    	</div>
    	<DataTable :columns="columns" :data="Patients" />
		</div>
  </div>
</template>