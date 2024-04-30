<script setup lang="ts">
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

// import { ref, onMounted } from "vue";
// import { columns } from "@/lib/medicines/columns";
// import type { Medicine } from "@/lib/medicines/columns";
// import DataTable from "@/components/ui/data-table.vue";


</script>

<template>
  <div class="space-y-4">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Medicamentos</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div class="flex justify-between">
      <div class="flex gap-3">
        <Button class="space-x-2">
          <Plus class="w-5 h-5" />
          <a href="/medicines/new"> Agregar </a>
        </Button>
      </div>
    </div>
  </div>
</template>
