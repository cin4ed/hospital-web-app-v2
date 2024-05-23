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
import { Plus, Info } from "lucide-vue-next";

const apointments = ref<Apointments[]>([]);
const doctors = ref<Doctor[]>([]);
const patients= ref<Patient[]>([]);
const combinedData = ref<Apointments[]>([]);

async function fetchData(): Promise<void> {
  try {
    /* Se piden todos los registros de medical-records */
    const response = await axios.get('/medical-records');
    apointments.value = response.data;

    /* Se piden todos los registros de doctors */
    const response1 = await axios.get('/doctors');
    doctors.value = response1.data;

    /* Se piden todos los registros de patients */
    const response2 = await axios.get('/patients');
    patients.value = response2.data;

    /* Asignamos los nuevo valores a un arreglo llamado combinedData el cual
    sera el encargado de hacer la busquede de id´s y mostrar los resultados pertinentes.
    Se hace de esta manera para que la tabla no absorba los datos de otro array que ya ha sido
    utilizado antes, puesto que al parecer no se actualiza de manera reactiva despues de asignados
    los valores a la tabla por primera vez*/
    combinedData.value = apointments.value.map((apointment) => {
      /* Buscamos los respectivos valores utilizando el id */
      const doctor = doctors.value.find(doc => doc.id === apointment.doctor_id);
      const patient = patients.value.find(patient => patient.id === apointment.patient_id);

      /* Validamos si se encuentra el doctor y el paciente, y en caso de no encontrarlo,
      mostramos el mensaje de no encontrado
      ...apointment, significa que estamos agregando todos los demas apointments al arreglo,
      ademas del actual */
      return {
        ...apointment,
        doctor_name: doctor ? doctor.name : 'Doctor no encontrado',
        patient_name: patient ? patient.name : 'Paciente no encontrado'
      };
    });

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
      <!-- Descripción de la pagina  -->
      <div class="text-gray-600 flex items-center gap-4 mt-4 text-sm mb-2 p-4 border border-gray-200 rounded shadow-sm bg-blue-50 w-1/3">
        <div><Info class="w-5 h-5"></Info></div>
        <div>
          <p>
            En esta sección, puedes explorar todas las citas médicas que se han registrado en nuestro sistema hasta la fecha.
          </p>
        </div>
      </div>
    	<DataTable :columns="columns" :data="combinedData" search-placeholder="Buscar por paciente..." search-by="patient_name"/>
		</div>
  </div>
</template>