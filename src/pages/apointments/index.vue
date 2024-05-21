<script setup lang="ts">
import axios from "@/lib/axios";
import { ref, onMounted } from "vue";
import type { Apointments } from "./columns.ts";

import type { Doctor } from "../doctors/columns.ts";

import type { Patient } from "../patients/columns.ts";

import { columns } from "@/pages/apointments/columns.ts";
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

const apointments = ref<Apointments[]>([]);
const doctors = ref<Doctor[]>([]);
const patients= ref<Patient[]>([]);

async function fetchData(): Promise<void> {
  try {
    const response = await axios.get('/medical-records');
    apointments.value = response.data;

    const response1 = await axios.get('/doctors');
    doctors.value = response1.data;
    console.log(doctors.value);

    const response2 = await axios.get('/patients');
    patients.value = response2.data;

    apointments.value.forEach((apointment) => {

        const doctor = doctors.value.find(doc => doc.id === apointment.id_doctor);
        if (doctor) {
        apointment.doctor_name = doctor.name;
        } else {
        apointment.doctor_name = 'Doctor no encontrado';
        }
        });
        console.log(apointments.value);

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
          <BreadcrumbPage>Citas</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
		<div>
    	<div class="flex items-end justify-between">
				<h1 class="text-3xl font-semibold">Citas</h1>
    	  <RouterLink to='/apointments/new'>
          <Button class="space-x-2">
            <Plus class="w-5 h-5" />
            <span>Nuevo</span>
          </Button>
    	  </RouterLink>
    	</div>
    	<DataTable :columns="columns" :data="apointments" />
		</div>
  </div>
</template>