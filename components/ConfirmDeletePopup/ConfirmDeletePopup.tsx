import { Button } from "@/components";

interface ConfirmDeletePopupProps {
  show: boolean;
  onDelete: (id: string) => void;
  onCancel: VoidFunction;
  messageTitle: string;
}

export default function ConfirmDeletePopup({
  show,
  onDelete,
  onCancel,
  messageTitle,
}: ConfirmDeletePopupProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">{messageTitle}</h2>
        <p className="mb-4 text-center">Si elimina, ¡no hay vuelta atrás!</p>
        <div className="flex justify-around mt-4">
          <Button color="red" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onDelete}>Eliminar</Button>
        </div>
      </div>
    </div>
  );
}
