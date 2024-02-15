import { CancelButton, ConfirmButton, FormInput } from "@/components";
import { useState } from "react";

interface CreateCategoryProps {
  onCancel: () => void;
}

export default function CreateCategory({ onCancel }: CreateCategoryProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can call your API to create the category
    console.log(`Categoría creada: ${categoryName}!`);
  };

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear categoría</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Nombre de la categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div className="flex justify-around mt-4">
            <CancelButton
              onClick={(event: any) => {
                event.preventDefault();
                onCancel();
              }}
            >
              Cancelar
            </CancelButton>
            <ConfirmButton type="submit">Crear</ConfirmButton>
          </div>
        </form>
      </div>
    </div>
  );
}
