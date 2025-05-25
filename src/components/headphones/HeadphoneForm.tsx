import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HeadphoneFormData } from "@/types/headphone";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  price: z.coerce
    .number()
    .min(1000, {
      message: "El precio debe ser al menos 1000 pesos.",
    })
    .positive(),
  durationMonths: z.coerce
    .number()
    .min(0, {
      message: "La duración debe ser mayor o igual a 0.",
    })
    .max(240, {
      message: "La duración no puede exceder 240 meses (20 años).",
    }),
});

interface HeadphoneFormProps {
  onSubmit: (data: HeadphoneFormData) => void;
}

export function HeadphoneForm({ onSubmit }: HeadphoneFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: undefined,
      durationMonths: undefined,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold text-gray-800">Agregar audífonos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Audífonos Sony WH-1000XM4..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Nombre o modelo de los audífonos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio (COP)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="350000" {...field} />
                </FormControl>
                <FormDescription>Precio en pesos colombianos.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="durationMonths"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duración (meses)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="6" {...field} />
                </FormControl>
                <FormDescription>
                  Cuánto tiempo te duraron en meses.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full md:w-auto">
          Agregar audífonos
        </Button>
      </form>
    </Form>
  );
}
