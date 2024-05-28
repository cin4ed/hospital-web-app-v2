import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { DateAndTimeSegmentObj } from "node_modules/radix-vue/dist/shared/date";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

export type Appointments = {
  id: number;
  patient_id: number;
  doctor_id: number;
  patient_name: string;
  doctor_name: string;
  datetime: DateAndTimeSegmentObj;
  name: string;
};

export const columns: ColumnDef<Appointments>[] = [
  {
    accessorKey: "datetime",
    header: ({ column }) => {
      return h(Button, {
        variant: "ghost",
        onClick: () => {
          const isSorted = column.getIsSorted();
          if (isSorted === "asc") {
            column.toggleSorting(true);
          } else if (isSorted === "desc") {
            column.clearSorting();
          } else {
            column.toggleSorting(false);
          }
        },
      }, () => ["Fecha de cita", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
    },
    cell: ({ row }) => {
      const appointment = row.original;
      const datetime = new Date(appointment.datetime);
      const formattedDateTime = datetime.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      return h("div", { class: "pl-8 capitalize" }, formattedDateTime);
    },
    size: 50,
  },  
  {
    accessorKey: "doctor_name",
    header: "Nombre del Doctor",
  },    
  {
    accessorKey: "patient_name",
    header: "Nombre del Paciente",
  },    
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const appointment = row.original;
      return h('div', { class: 'relative'}, h(DropdownAction, {
        resource: 'medical-records',
        id: appointment.id
      }))
    }
  }
];