import { Button, FormInput } from "@/components";

interface CreateOrderProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateOrder({ show, onCancel }: CreateOrderProps) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can call your API to create the provider
    console.log(`Producto creado!`);
  };

  const allInputsAreValid = () => {
    // Here you can add your validation logic
    return true;
  };

  if (!show) {
    return null;
  }

  return (
    <div className="relative flex flex-col flex-grow items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">Crear pedido</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <FormInput type="number" placeholder="Número del pedido" />
        <FormInput type="number" placeholder="Total del pedido" />
        <FormInput type="text" placeholder="Observaciones" />
        <footer className="flex justify-around mt-5">
          <Button
            color="red"
            onClick={(event: any) => {
              event.preventDefault();
              onCancel();
            }}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={!allInputsAreValid()}>
            Crear
          </Button>
        </footer>
      </form>
    </div>
  );
}
