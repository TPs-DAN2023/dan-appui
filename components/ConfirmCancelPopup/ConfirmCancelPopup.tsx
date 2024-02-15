import { ConfirmButton, CancelButton } from "@/components";

interface ConfirmCancelPopupProps {
  onConfirm: (args?: any) => void;
  onCancel: () => void;
}

export default function ConfirmCancelPopup({
  onConfirm,
  onCancel,
}: ConfirmCancelPopupProps) {
  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          ¿Desea cancelar la creación de la entidad?
        </h2>
        <p className="mb-4">Si cancela, los datos ingresados se perderán.</p>
        <div className="flex justify-end">
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
          <ConfirmButton onClick={onConfirm}>Confirmar</ConfirmButton>
        </div>
      </div>
    </div>
  );
}