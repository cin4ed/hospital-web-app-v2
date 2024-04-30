<script setup lang="ts">
import SideNav from "@/components/side-nav.vue";
import Header from "@/components/header.vue";
</script>

<template>
  <div class="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
    <SideNav />
    <div class="flex flex-col">
      <Header />
      <RouterView class="p-4"/>
    </div>
  </div>
</template>