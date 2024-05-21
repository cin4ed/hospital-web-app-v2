import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
// import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
// import { Button } from "@/components/ui/button";
// import { DateAndTimeSegmentObj } from "node_modules/radix-vue/dist/shared/date";

export type Certificates = {
  id: number;
  patient_id: number;
  doctor_id: number;
  patient_name: string;
  age: number;
  height: number;
  weight: number;
  systolic_pressure: number;
  diastolic_pressure: number;
  heart_rate: number;
  respiratory_rate: number;
  date: Date;
  doctor_name: string;
  name: string;
};

export const columns: ColumnDef<Certificates>[] = [
  {
    accessorKey: "date",
    header: "Fecha de emisión",
  },  
  {
    accessorKey: "doctor_name",
    header: "Nombre del doctor",
  },    
  {
    accessorKey: "patient_name",
    header: "Nombre del paciente",
  }, {
    accessorKey: "age",
    header: "Edad",
  },  
  {
    accessorKey: "height",
    header: "Altura",
  },    
  {
    accessorKey: "weight",
    header: "Peso",
  },{
    accessorKey: "systolic_pressure",
    header: "Presión sistólica",
  },  
  {
    accessorKey: "diastolic_pressure",
    header: "Presión diastólica",
  },    
  {
    accessorKey: "heart_rate",
    header: "Ritmo cárdiaco",
  },{
    accessorKey: "respiratory_rate",
    header: "Ritmo de respiración",
  },   
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const certificate = row.original;
      return h('div', { class: 'relative'}, h(DropdownAction, {
        resource: 'certificates',
        id: certificate.id
      }))
    }
  }
];