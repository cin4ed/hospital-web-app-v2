import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { DateAndTimeSegmentObj } from "node_modules/radix-vue/dist/shared/date";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

export type Prescriptions = {
  id: number;
  patient_id: number;
  doctor_id: number;
  medical_record_id: number;
  notes: string;
  patient_name: string;
  doctor_name: string;
  date: DateAndTimeSegmentObj;
  name: string;
};

export const columns: ColumnDef<Prescriptions>[] = [
  {
    accessorKey: "date",
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
      }, () => ["Fecha de emisión", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
    },
    cell: ({ row }) => {
      const patient = row.original;
      const date = new Date(patient.date); // Asumiendo que la fecha está en formato ISO 8601 o similar
      const formattedDate = date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      return h("div", { class: "text-center capitalize" }, formattedDate);
    },
  },  
  {
    accessorKey: "notes",
    header: "Notas de la receta",
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
      const prescription = row.original;
      return h('div', { class: 'relative'}, h(DropdownAction, {
        resource: 'prescriptions',
        id: prescription.id
      }))
    }
  }
];