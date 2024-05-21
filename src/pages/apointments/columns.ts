import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { datetimeRegex } from "zod";
import { DateAndTimeSegmentObj } from "node_modules/radix-vue/dist/shared/date";

export type Apointments = {
  id: number;
  patient_id: number;
  doctor_id: number;
  patient_name: string;
  doctor_name: string;
  datetime: DateAndTimeSegmentObj;
  name: string;
};

export const columns: ColumnDef<Apointments>[] = [
  {
    accessorKey: "datetime",
    header: "Fecha de cita",
  },  
  {
    accessorKey: "doctor_name",
    header: "Nombre del Doctor",
  },    
  {
    accessorKey: "patient_name",
    header: "Nombre del Doctor",
  },    
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const apointment = row.original;

      return h('div', { class: 'relative'}, h(DropdownAction, {
        apointment,
      }))
    }
  }
];