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
          <BreadcrumbPage>Medicamentos</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
		<div>
    	<div class="flex items-end justify-between">
				<h1 class="text-3xl font-semibold">Medicinas</h1>
    	  <Button class="space-x-2">
    	    <Plus class="w-5 h-5" />
					<RouterLink to='/medicines/new'>
 	  	    	Nueva
	  	   	</RouterLink>
    	  </Button>
    	</div>
    	<DataTable :columns="columns" :data="medicines" />
		</div>
  </div>
</template>
