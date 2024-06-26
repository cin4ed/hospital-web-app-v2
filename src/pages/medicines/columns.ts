import { h } from "vue";
import DropdownAction from "@/components/DataTableDropDown.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

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
      }, () => ["Nombre", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]);
    },
    cell: ({ row }) => {
      const medicine = row.original;
      return h("div", { class: "capitalize" }, medicine.name);
    },
    size: 50,
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
    header: "Existencias",
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
      return h('div', { class: 'relative' }, h(DropdownAction, {
        resource: 'medicines',
        id: medicine.id
      }))
    }
  }
];
