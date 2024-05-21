<script setup lang="ts">
import { useForm } from "vee-validate";
import axios from "@/lib/axios";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const formSchema = toTypedSchema(
  z.object({
    name: z.string(),
    lastname: z.string(),
    birth_date: z.string(),
    affiliation_date: z.string(),
    phone_number: z.number(),
    blood_type: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  })
);

  const form = useForm({
    validationSchema: formSchema,
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
    axios.post(`/patients`, values);
  });
</script>

<template>
    <p>proximamente :D</p>
</template>
