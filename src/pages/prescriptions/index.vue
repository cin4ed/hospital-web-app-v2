<script setup lang="ts">
import axios from "@/lib/axios";
import { ref, onMounted } from "vue";
import type { Prescriptions } from "./columns.ts";
import type { Doctor } from "../doctors/columns.ts";
import type { Patient } from "../patients/columns.ts";


import { columns } from "@/pages/prescriptions/columns.ts";
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

import { Apointments } from "../appointments/columns.ts";

const prescriptions = ref<Prescriptions[]>([]);
const doctors = ref<Doctor[]>([]);
const patients= ref<Patient[]>([]);

const medical_records= ref<Apointments[]>([]);
const combinedData = ref<Prescriptions[]>([]);


async function fetchData(): Promise<void> {
  try {
    /* Se piden todos los registros de medical-records */
    const response = await axios.get('/prescriptions');
    prescriptions.value = response.data;

    const response3 = await axios.get('/medical-records');  
    medical_records.value = response3.data;

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
    combinedData.value = prescriptions.value
    .filter(prescription => medical_records.value.some(m_R => m_R.id === prescription.medical_record_id))
    .map((prescription) => {
      /* Buscamos los respectivos valores utilizando el id */
      const medical_record = medical_records.value.find(m_R => m_R.id === prescription.medical_record_id);
      const doctor = doctors.value.find(doc => doc.id === medical_record.doctor_id);
      const patient = patients.value.find(patient => patient.id === medical_record.patient_id);

      /* Validamos si se encuentra el doctor y el paciente, y en caso de no encontrarlo,
      mostramos el mensaje de no encontrado */
      return {
        ...prescription,
        medical_record: medical_record.id,
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
          <BreadcrumbPage>Recetas</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
		<div>
    	<div class="flex items-end justify-between">
				<h1 class="text-3xl font-semibold">Recetas</h1>
    	  <RouterLink to='/prescriptions/new'>
          <Button class="space-x-2">
            <Plus class="w-5 h-5" />
            <span>Nueva</span>
          </Button>
    	  </RouterLink>
    	</div>
      <div class="text-gray-600 flex items-center gap-4 mt-4 text-sm mb-2 p-4 border border-gray-200 rounded shadow-sm bg-blue-50 w-1/3">
        <div><Info class="w-5 h-5"></Info></div>
        <div>
          <p>
            En esta sección, puedes explorar todos los registros de las recetas en nuestro sistema hasta la fecha.
          </p>
        </div>
      </div>
    	<DataTable :columns="columns" :data="combinedData" search-placeholder="Buscar por nombre del paciente..." search-by="patient_name" />
		</div>
  </div>
</template>