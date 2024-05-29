<script setup lang="ts">
  import { MoreHorizontal } from 'lucide-vue-next';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
  import { Button } from '@/components/ui/button';
  import axios from "@/lib/axios";
  import { useRouter, useRoute } from 'vue-router';
  import { toast } from 'vue-sonner'
  import { ref, watch } from 'vue'

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

  const props = defineProps<{
    resource: string;
    id: number;
  }>();

  const router = useRouter();
  const deleteId = ref(-1);
  const displayDeleteConfirmationMessage = ref(false)

  watch(deleteId, () => {
    displayDeleteConfirmationMessage.value = true
  })

  const formattedData = ref([]);
  const getElementData = async () => {
    try {
      const response = await axios.get(`/${props.resource}/${props.id}`);
      const data = response.data;

      const doctorsTable = await axios.get(`/doctors/`);
      const doctorsData = doctorsTable.data;

      const patientsTable = await axios.get(`/patients/`);
      const patientsData = patientsTable.data;

      formattedData.value = Object.keys(data).map(key => {
        let value = data[key];

        if (key === 'doctor_id') {
          const doctor = doctorsData.find(doc => doc.id === value);
          value = doctor ? doctor.name : "No se encontró el registro";
        } else if (key === 'patient_id') {
          const patient = patientsData.find(pat => pat.id === value);
          value = patient ? patient.name : "No se encontró el registro";
        } else if (key === 'medicines') {
          value = "No se puede desplegar el listado de medicinas aquí. Favor de consultarlo en la vista detallada de la receta."
        }

        return {
          header: key,
          value: value
        };
      });

      console.log(formattedData.value);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  function deleteElement(argument: any) {
    if(props.resource == 'appointments'){
      axios.delete(`/medical-records/${props.id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting element:', error);
      });
    }else{
      axios.delete(`/${props.resource}/${props.id}`)
      .then(() => {
        toast.success('Su registro se ha eliminado con éxito');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        console.error('Error deleting element:', error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error('Ha ocurrido un error al intentar eliminar este registro', {
            description: `${error.response.data.message}`,
          });
        } else {
          toast.error('Ha ocurrido un error desconocido al intentar eliminar este registro');
        }
      });
    }
  }
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-Child>
			<Button variant="ghost" class="w-8 h-8 p-0">
				<span class="sr-only">Open menu</span>
				<MoreHorizontal class="w-4 h-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuLabel>Actions</DropdownMenuLabel>
			<DropdownMenuSeparator />
      <RouterLink :to="'/'+resource+'/'+id+'/edit'" v-if="resource != 'medical-certificates' && resource != 'medical-records'">
        <DropdownMenuItem>
          Editar
        </DropdownMenuItem>
      </RouterLink>
      <RouterLink :to="'/'+resource+'/'+id+'/show'" v-if="resource != 'medical-certificates' && resource != 'medical-records'">
        <DropdownMenuItem>
          Visualizar
        </DropdownMenuItem>
      </RouterLink>
      <RouterLink :to="'/appointments/'+id+'/edit'" v-if="resource == 'medical-records'">
        <DropdownMenuItem>
          Editar
        </DropdownMenuItem>
      </RouterLink>
      <RouterLink :to="'/appointments/'+id+'/show'" v-if="resource == 'medical-records'">
        <DropdownMenuItem>
          Visualizar
        </DropdownMenuItem>
      </RouterLink>
      <a :href="'https://hospital.betweenframes.net/api/'+resource+'/'+id+'/generate-pdf'" v-if="resource == 'medical-certificates'" target="_blank">
        <DropdownMenuItem>
          Imprimir certificado
        </DropdownMenuItem>
      </a>
      <AlertDialog>
        <AlertDialogTrigger class="hover:bg-gray-100 transition-all duration-300 text-start
        w-full px-2 rounded-sm py-1 text-sm" @click="getElementData(id)">Eliminar</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estas completamente seguro de querer borrar este registro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no puede deshacerse, y una vez eliminada el registro no podrá ser recuperador
              de ninguna manera, afectando los registros de otras tablas y la integridad de las mismas.
            </AlertDialogDescription>
            <p class="text-black font-semibold text-lg">Datos a eliminar:</p>
            <div class="overflow-auto max-h-96">
              <div class="flex flex-col flex-wrap gap-3 justify-start">
                <p class="border-2 p-2" v-for="element in formattedData" :key=element.id>
                  <p class="text-black font-semibold">{{ element.header }}</p>
                  <p class="pl-3">{{ element.value }}</p>
                </p>
              </div>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction @click="deleteElement(id)">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
		</DropdownMenuContent>
	</DropdownMenu>	
</template>
