interface ConfirmDeletePopupProps {
  show: boolean;
  onDelete: VoidFunction;
  onCancel: VoidFunction;
  message: string;
}

export default function ConfirmDeletePopup({
  show,
  onDelete,
  onCancel,
  message,
}: ConfirmDeletePopupProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-6">
        <p className="text-lg">{message}</p>
        <div className="flex justify-end mt-4">
          <button className="btn btn-secondary mr-2" onClick={() => onCancel()}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={() => onDelete()}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
