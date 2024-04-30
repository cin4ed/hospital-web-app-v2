import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";

export type Medicine = {
  id: number;
  name: string;
  active_ingredients: string;
  dosage_strength: string;
  dosage_unit: string;
  prescription_info: string;
  type: string;
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
  },
  {
    accessorKey: "active_ingredients",
    header: "Componentes Activos",
  },
  {
    accessorKey: "type",
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
];
