import { Headphone } from "@/types/headphone";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface HeadphoneItemProps {
  headphone: Headphone;
  onDelete: (id: string) => void;
}

export function HeadphoneItem({ headphone, onDelete }: HeadphoneItemProps) {
  // Format the price as Colombian Pesos
  const formattedPrice = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(headphone.price);

  // Format the purchase date
  const purchaseDate = new Date(headphone.purchaseDate);
  const formattedDate = new Intl.DateTimeFormat("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(purchaseDate);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border gap-4">
      <div className="flex flex-col flex-1 min-w-0">
        <h3 className="font-medium text-slate-900 truncate">
          {headphone.name}
        </h3>
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <p className="text-sm text-slate-500">
            <span className="font-medium">Precio:</span> {formattedPrice}
          </p>
          <p className="text-sm text-slate-500">
            <span className="font-medium">Duración:</span>{" "}
            {headphone.durationMonths} meses
          </p>
          <p className="text-sm text-slate-500">
            <span className="font-medium">Agregado:</span> {formattedDate}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(headphone.id)}
        className="text-slate-400 hover:text-destructive"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
