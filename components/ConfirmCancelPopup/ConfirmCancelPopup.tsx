import { Button } from "@/components";

interface ConfirmCancelPopupProps {
  show: boolean;
  onConfirm: (args?: any) => void;
  onCancel: () => void;
  messageTitle: string;
}

export default function ConfirmCancelPopup({
  show,
  onConfirm,
  onCancel,
  messageTitle,
}: ConfirmCancelPopupProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{messageTitle}</h2>
        <p className="mb-4 text-center">
          Si cancela, los datos ingresados se perderán.
        </p>
        <div className="flex justify-around mt-4">
          <Button color="red" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </div>
  );
}
