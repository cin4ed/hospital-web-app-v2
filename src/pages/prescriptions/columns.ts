import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { DateAndTimeSegmentObj } from "node_modules/radix-vue/dist/shared/date";

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
    header: "Fecha de receta",
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