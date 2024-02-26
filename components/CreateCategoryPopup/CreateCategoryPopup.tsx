import { API_URLS } from "@/services";
import { Button, FormInput } from "@/components";
import { ICategory } from "@/interfaces";
import { useState } from "react";
import { getUserToken } from "@/utils";

interface CreateCategoryProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateCategory({
  show,
  onCancel,
}: CreateCategoryProps) {
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsCreatingCategory(true);

    try {
      const response = await fetch(API_URLS.categories, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error("Error creating category");
      }

      const newCategory = await response.json();
      console.log("Categoría creada!", newCategory);
      setIsCreatingCategory(false);
      handleCancel(event);
    } catch (error) {
      console.error(error);
      setIsCreatingCategory(false);
    }
  };

  if (!show) {
    return null;
  }

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
            <Button color="red" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreatingCategory}>
              {isCreatingCategory ? "Creando..." : "Crear"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
