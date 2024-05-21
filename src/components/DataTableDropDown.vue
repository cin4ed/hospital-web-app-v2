<script setup lang="ts">
	import { MoreHorizontal } from 'lucide-vue-next';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
	import { Button } from '@/components/ui/button';

	defineProps<{
		payment: {
			id: string
		}
	}>()
	
	function deleteElement(argument: any) {
		console.log("Eliminar"+argument);
	}
	function editElement(argument: any) {
		console.log("Editar"+argument);
	}
	function showElement(argument: any) {
		console.log("Mostrar"+argument);
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
			<DropdownMenuItem @click="deleteElement(payment.id)">
				Eliminar
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="editElement(payment.id)">Editar</DropdownMenuItem>
			<DropdownMenuItem @click="showElement(payment.id)">Visualizar</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>	
</template
