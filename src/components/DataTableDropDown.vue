<script setup lang="ts">
  import { MoreHorizontal } from 'lucide-vue-next';
  import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
  import { Button } from '@/components/ui/button';
  import axios from "@/lib/axios";
  import { useRouter, useRoute } from 'vue-router';

  const props = defineProps<{
    resource: string;
    id: number;
  }>();

  const router = useRouter();

  function deleteElement(argument: any) {
    axios.delete(`/${props.resource}/${props.id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        console.error('Error deleting element:', error);
      });
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
      <RouterLink :to="'/'+resource+'/'+id+'/edit'" v-if="resource != 'medical-certificates'">
        <DropdownMenuItem>
          Editar
        </DropdownMenuItem>
      </RouterLink>
      <RouterLink :to="'/'+resource+'/'+id+'/show'" v-if="resource != 'medical-certificates'">
        <DropdownMenuItem>
          Visualizar
        </DropdownMenuItem>
      </RouterLink>
      <a :href="'http://127.0.0.1:8000/api/'+resource+'/'+id+'/generate-pdf'" v-if="resource == 'medical-certificates'" target="_blank">
        <DropdownMenuItem>
          Imprimir certificado
        </DropdownMenuItem>
      </a>
      <DropdownMenuItem @click="deleteElement(id)">
        Eliminar
      </DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>	
</template>
