import { useState } from "react";
import { HeadphoneForm } from "@/components/headphones/HeadphoneForm";
import { HeadphoneList } from "@/components/headphones/HeadphoneList";
import { Headphone, HeadphoneFormData } from "@/types/headphone";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [headphones, setHeadphones] = useLocalStorage<Headphone[]>(
    "headphones",
    [],
  );

  const handleAddHeadphone = (data: HeadphoneFormData) => {
    const newHeadphone: Headphone = {
      id: crypto.randomUUID(),
      name: data.name,
      price: data.price,
      durationMonths: data.durationMonths,
      purchaseDate: new Date().toISOString(),
    };

    setHeadphones([...headphones, newHeadphone]);

    toast({
      title: "Audífonos agregados",
      description: `${data.name} ha sido agregado a tu lista.`,
    });
  };

  const handleDeleteHeadphone = (id: string) => {
    const headphoneToDelete = headphones.find((h) => h.id === id);
    setHeadphones(headphones.filter((h) => h.id !== id));

    if (headphoneToDelete) {
      toast({
        title: "Audífonos eliminados",
        description: `${headphoneToDelete.name} ha sido eliminado de tu lista.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Contador de Audífonos Dañados
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Lleva un registro de todos los audífonos que has dañado, su precio y
            cuánto tiempo te duraron. Visualiza cuánto dinero has gastado en
            total en pesos colombianos.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-1 max-w-4xl mx-auto">
          <HeadphoneForm onSubmit={handleAddHeadphone} />

          <HeadphoneList
            headphones={headphones}
            onDelete={handleDeleteHeadphone}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
