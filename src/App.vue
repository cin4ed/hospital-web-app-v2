<script setup lang="ts">
  import SideNav from "@/components/side-nav.vue";
  import Header from "@/components/header.vue";
  import { ref } from "vue";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import * as z from "zod";
  import { toTypedSchema } from "@vee-validate/zod";
  import { useForm } from "vee-validate";
  import axios from "@/lib/axios";

  import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

  const formSchema = toTypedSchema(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  );

  const form = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  let user = localStorage.getItem('user')
  const loadLayout = ref(false)
  if(user)
    loadLayout.value = true
</script>

<template>
  <div>
    <div class="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]" v-if="loadLayout">
      <SideNav v-if="loadLayout" />
      <div class="flex flex-col">
        <Header v-if="loadLayout" />
        <RouterView class="p-4" v-if="loadLayout" />
      </div>
    </div>
    <div class="flex w-full h-screen" v-else>
      <div class="bg-zinc-900 w-full flex flex-col justify-between">
        <div class="flex items-center align-middle px-10 mt-10 select-none">
          <img src="/icon.png" alt="Vite Logo" class="w-1/12">
          <p class="font-semibold text-white text-2xl p-4">SuperHospital</p>
        </div>
        <div class="p-4 flex flex-col gap-2">
          <div class="flex flex-col">
            <p class="text-white text-2xl">¡Bienvenido al Sistema de Gestión Hospitalaria!</p>
          </div>
          <p class="pl-6 text-gray-300">Inicie sesión para comenzar a aprovechar todas las funcionalidades que ofrece nuestra plataforma 
            y lleve la administración hospitalaria a un nuevo nivel de excelencia.</p>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <div class="w-1/2 flex flex-col justify-center items-center gap-3">
          <p class="text-2xl font-bold">Inicia Sesión</p>
          <p class="text-gray-400">Ingresa tus credenciales para acceder</p>
          <form @submit="onSubmit" class="space-y-4 w-full">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingresa tu correo electronico"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <Button type="submit" class="w-full">Iniciar sesión</Button>
          </form>
          <p class="text-gray-500">
            Al hacer clic en continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>