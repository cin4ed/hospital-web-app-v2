<script setup lang="ts">
import { Search, CircleUser } from 'lucide-vue-next';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/theme-toggle.vue';
</script>

<template>
  <header class='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
    <div class='w-full flex-1'>
      <form>
        <div class='relative'>
          <Search class='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
              type='search'
              placeholder='Search something...'
              class='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
          />
        </div>
      </form>
    </div>
    <div class='flex gap-3'>
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary' size='icon' class='rounded-full'>
            <CircleUser class='h-5 w-5' />
            <span class='sr-only'>Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>