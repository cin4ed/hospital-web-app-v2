import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { DateAndTimeSegmentObj } from "node_modules/radix-vue/dist/shared/date";

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
    header: "Fecha de cita",
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