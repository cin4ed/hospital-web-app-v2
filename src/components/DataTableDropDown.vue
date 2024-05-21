<script setup lang="ts">
	import { MoreHorizontal } from 'lucide-vue-next';
	import axios from "@/lib/axios";
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
	import { Button } from '@/components/ui/button';
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const props = defineProps<{
		payment: {
			id: string;
		};
		root: {
			id: string;
		};
	}>();
	
	function deleteElement(argument: any) {
		axios.delete(`/${props.root}/${argument}`);
	}
	function editElement(argument: any) {
		router.push({
			path: `/${props.root}/edit`,
			query: { item_id: argument}
		});
	}
	function showElement(argument: any) {
		router.push({
			path: `/${props.root}/view`,
			query: { item_id: argument}
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
			<DropdownMenuItem @click="deleteElement(payment.id)">
				Eliminar
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem @click="editElement(payment.id)">Editar</DropdownMenuItem>
			<DropdownMenuItem @click="showElement(payment.id)">Visualizar</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>	
</template
