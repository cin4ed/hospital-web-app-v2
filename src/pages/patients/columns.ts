import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

export type Patient = {
  id: number;
  name: string;
  lastname: string;
  birth_date: Date;
  affiliation_date: Date;
  phone_number: number;
  blood_type: string;
};

export const columns: ColumnDef<Patient>[] = [
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
    accessorKey: "lastname",
    header: "Apellidos",
  },
  {
    accessorKey: "birth_date",
    header: "Fecha de nacimiento",
  },
  {
    accessorKey: "affiliation_date",
    header: "Fecha de afiliacion",
  },
  {
    accessorKey: "phone_number",
    header: "Numero de telefono",
  },
  {
    accessorKey: "blood_type",
    header: "Tipo de sangre",
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row
      const root = 'patients'

      return h('div', { class: 'relative' }, h(DropdownAction, {
        payment,
        root
      }))
    },
  },
];