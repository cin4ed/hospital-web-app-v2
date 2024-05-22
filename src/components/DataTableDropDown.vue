<script setup lang="ts">
	import { MoreHorizontal } from 'lucide-vue-next';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
	import { Button } from '@/components/ui/button';

	defineProps<{
    resource: string
    id: number
	}>()

  function deleteElement(argument: any) {
    console.log("Eliminar"+argument);
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
      <RouterLink :to="'/'+resource+'/'+id+'/edit'">
        <DropdownMenuItem>
          Editar
        </DropdownMenuItem>
      </RouterLink>
      <RouterLink :to="'/'+resource+'/'+id+'/show'">
        <DropdownMenuItem>
          Visualizar
        </DropdownMenuItem>
      </RouterLink>
      <DropdownMenuItem @click="deleteElement(id)">
        Eliminar
      </DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>	
</template>
