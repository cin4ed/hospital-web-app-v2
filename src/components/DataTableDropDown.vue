<script setup lang="ts">
	import { MoreHorizontal } from 'lucide-vue-next';
	import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
	import { Button } from '@/components/ui/button';

	defineProps<{

	}>();

	function doSomething() {
		console.log("hello");
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
			<DropdownMenuItem @click="doSomething">
				Do Something
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem>View customer</DropdownMenuItem>
			<DropdownMenuItem>View payment</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>	
</template
