import { Headphone } from "@/types/headphone";
import { HeadphoneItem } from "./HeadphoneItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HeadphoneListProps {
  headphones: Headphone[];
  onDelete: (id: string) => void;
}

export function HeadphoneList({ headphones, onDelete }: HeadphoneListProps) {
  // Calculate total cost
  const totalCost = headphones.reduce((sum, item) => sum + item.price, 0);

  // Format total cost as COP
  const formattedTotalCost = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalCost);

  // Calculate average duration
  const avgDuration = headphones.length
    ? headphones.reduce((sum, item) => sum + item.durationMonths, 0) /
      headphones.length
    : 0;

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Historial de audífonos dañados</CardTitle>
        <CardDescription>
          Has registrado {headphones.length} audífonos dañados por un total de{" "}
          <span className="font-bold text-destructive">
            {formattedTotalCost}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {headphones.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No has registrado ningún audífono dañado todavía. Usa el formulario
            para agregar tu primer registro.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4">
              {headphones.map((headphone) => (
                <HeadphoneItem
                  key={headphone.id}
                  headphone={headphone}
                  onDelete={onDelete}
                />
              ))}
            </div>

            <div className="pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-slate-500">
                    Total gastado
                  </h3>
                  <p className="text-2xl font-bold text-slate-900">
                    {formattedTotalCost}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-slate-500">
                    Duración promedio
                  </h3>
                  <p className="text-2xl font-bold text-slate-900">
                    {avgDuration.toFixed(1)} meses
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
