import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";

export type Medicine = {
  id: number;
  name: string;
  active_ingredients: string;
  dosage_strength: string;
  dosage_unit: string;
  prescription_info: string;
  presentation: string;
  price: number;
  quantity_in_stock: number;
  supplier_name: string;
  supplier_contact: string;
  supplier_cost: number;
};

export const columns: ColumnDef<Medicine>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "dosage_strength",
    header: "Dosis",
    cell: ({ row }) => {
      return row.getValue("dosage_strength") + row.original.dosage_unit;
    }
  },
  {
    accessorKey: "active_ingredients",
    header: "Componentes Activos",
  },
  {
    accessorKey: "presentation",
    header: "Presentación",
  },
  {
    accessorKey: "quantity_in_stock",
    header: "Stock",
  },
  {
    accessorKey: "price",
    header: () => h("div", { class: "text-right" }, "Precio"),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MXN",
      }).format(amount);

      return h("div", { class: "text-right font-medium" }, formatted);
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const medicine = row.original;

      return h('div', { class: 'relative'}, h(DropdownAction, {
        medicine,
      }))
    }
  }
];
