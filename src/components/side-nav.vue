<script setup lang="ts">
import {
  Home,
  Users,
  Tablets,
  BookMarked,
  ClipboardList,
  FileBadge2,
  Package2,
  Bell,
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
</script>

<template>
  <div class='hidden border-r bg-muted/40 md:block'>
    <div class='flex h-full max-h-screen flex-col gap-2'>
      <div class='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
        <RouterLink to='/' class='flex items-center gap-2 font-semibold'>
          <Package2 class='h-6 w-6' />
          <span>Hospital</span>
        </RouterLink>
        <Button variant='outline' size='icon' class='ml-auto h-8 w-8'>
          <Bell class='h-4 w-4' />
          <span class='sr-only'>Toggle notifications</span>
        </Button>
      </div>
      <div class='flex-1'>
        <nav class='grid items-start px-4 text-sm font-medium'>
          <RouterLink to='/' class="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Home class='h-4 w-4' />
            Inicio
          </RouterLink>
          <RouterLink to='/appointments' class="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <BookMarked class='h-4 w-4' />
            Citas
          </RouterLink>
          <RouterLink to='/patients' class="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Users class='h-4 w-4' />
            Pacientes
          </RouterLink>
          <RouterLink to='/medical-certificates' class="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <FileBadge2 class='h-4 w-4' />
            Certificados
          </RouterLink>
          <RouterLink to='/prescriptions' class="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <ClipboardList class='h-4 w-4' />
            Recetas Medicas
          </RouterLink>
          <RouterLink to='/medicines' class="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-all hover:text-primary">
            <Tablets class='h-4 w-4' />
            Medicamentos
          </RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>
