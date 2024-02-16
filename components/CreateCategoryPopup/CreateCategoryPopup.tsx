import { CancelButton, ConfirmButton, FormInput } from "@/components";
import { ICategory } from "@/interfaces";
import addCategoryMock from "@/mocks/addCategoryMock";
import { useState } from "react";

interface CreateCategoryProps {
  onCancel: () => void;
}

export default function CreateCategory({ onCancel }: CreateCategoryProps) {
  const initialCategoryState = {
    nombre: "",
  };

  const [category, setCategory] = useState<ICategory>(initialCategoryState);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const handleCancel = (event: any) => {
    event.preventDefault();
    setCategory(initialCategoryState);
    onCancel();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsCreatingCategory(true); // Set isCreatingCategory to true while waiting for the category to be created
    // Here you can call your API to create the category
    console.log("Categoría creada!");
    addCategoryMock(category).then((res) => {
      console.log(res);
      setIsCreatingCategory(false); // Set isCreatingCategory back to false after the category is created
      handleCancel(event);
    });
  };

  return (
    <div className="fixed flex items-center justify-center z-10">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear categoría</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="text"
            placeholder="Nombre de la categoría"
            value={category.nombre}
            required
            onChange={(e) =>
              setCategory({ ...category, nombre: e.target.value })
            }
          />
          <div className="flex justify-around mt-4">
            <CancelButton onClick={handleCancel}>Cancelar</CancelButton>
            <ConfirmButton type="submit" disabled={isCreatingCategory}>
              {isCreatingCategory ? "Creando..." : "Crear"}
            </ConfirmButton>
          </div>
        </form>
      </div>
    </div>
  );
}
