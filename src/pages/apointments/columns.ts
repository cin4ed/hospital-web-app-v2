import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

export type Apointments = {
  id: number;
  apointment_date: Date;
  id_patient: number;
  id_doctor: number;
  patient_name: string;
  doctor_name: string;
  name: string;

};

export const columns: ColumnDef<Apointments>[] = [
  {
    accessorKey:"name",
    header:"name"
  },
  {
    accessorKey: "apointment_date",
    header: "Fecha de cita",
  },  
  {
    accessorKey: "patient_name",
    header: "Paciente",
  },  {
    accessorKey: "doctor_name",
    header: "Doctor",
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