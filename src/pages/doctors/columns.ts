import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

export type Doctor = {
  id: number;
  name: string;
  lastname: string;
  speciality: string;
  admission_date: Date;
  cedule_id: string;
  phone_number: string;
  email: string;

};

export const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }, () => ["Nombre", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })])
    },
    cell: ({ row }) => {
      const name = row.getValue("name");
      return h("div", {class: "capitalize"}, name);
    },
    size: 50,
  },
  {
    accessorKey: "last_name",
    header: "Apellido",
    cell: ({ row }) => {
      return row.original.lastname;
    }
  },
  {
    accessorKey: "admission_date",
    header: "Fecha de admisión",
  },
  {
    accessorKey: "professional_id",
    header: "Cédula",
  },
  {
    accessorKey: "phone_number",
    header: "Número telefónico",
  },
  {
     accessorKey: "email",
     header: "Correo electrónico",
   
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row
      const root = 'doctors'

      return h('div', { class: 'relative'}, h(DropdownAction, {
        payment,
        root
      }))
    }
  }
];
