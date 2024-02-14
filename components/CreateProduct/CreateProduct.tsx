import { useEffect, useState } from "react";
import {
  CreateCategory,
  CreateProvider,
  ConfirmButton,
  CancelButton,
  OpenDialogButton,
  FormInput,
} from "@/components";
import { ICategory, IProvider } from "@/interfaces";

interface CreateProductProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateProduct({ show, onCancel }: CreateProductProps) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCreatingProvider, setIsCreatingProvider] = useState(false);
  const [providers, setProviders] = useState([]);

  const fetchCategories = async () => {
    // Here you can call your API to fetch the categories
    console.log("Fetching categories...");
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setCategories(json));
  };

  const fetchProviders = async () => {
    // Here you can call your API to fetch the providers
    console.log("Fetching providers...");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setProviders(json));
  };

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
    <div className="relative flex flex-grow items-center justify-center">
      <div
        className={`flex flex-col items-center justify-center ${
          isCreatingCategory || isCreatingProvider ? "opacity-50" : ""
        }`}
      >
        <h1 className="text-2xl font-bold">Crear producto</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput type="text" placeholder="Nombre del producto" />
          <FormInput type="text" placeholder="Descripción del producto" />

          <div className="flex items-center">
            <span>$</span>
            <FormInput
              type="number"
              placeholder="Precio del producto"
              min="0"
            />
          </div>
          <FormInput type="number" placeholder="Stock inicial" min="0" />
          {/* I need two list one with categories and another with providers for user to select */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <select
                className="border-2 border-gray-300 p-2 m-2"
                onClick={fetchCategories}
              >
                <option value="" hidden>
                  Seleccione una categoría
                </option>
                {categories.map((category: ICategory) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre}
                  </option>
                ))}
              </select>
              <OpenDialogButton onClick={() => setIsCreatingCategory(true)}>
                + Crear categoría
              </OpenDialogButton>
            </div>
            <div className="flex items-center">
              <select
                className="border-2 border-gray-300 p-2 m-2"
                onClick={fetchProviders}
              >
                <option value="" hidden>
                  Seleccione un proveedor
                </option>
                {providers.map((provider: IProvider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.nombre} - {provider.mail}
                  </option>
                ))}
              </select>
              <OpenDialogButton onClick={() => setIsCreatingProvider(true)}>
                + Crear proveedor
              </OpenDialogButton>
            </div>
          </div>
          <footer className="flex justify-around mt-5">
            <CancelButton
              onClick={(event: any) => {
                event.preventDefault();
                onCancel();
              }}
            >
              Cancelar
            </CancelButton>
            <ConfirmButton type="submit" disabled={!allInputsAreValid()}>
              Crear
            </ConfirmButton>
          </footer>
        </form>
      </div>

      {isCreatingCategory && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CreateCategory onCancel={() => setIsCreatingCategory(false)} />
        </div>
      )}

      {isCreatingProvider && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CreateProvider onCancel={() => setIsCreatingProvider(false)} />
        </div>
      )}
    </div>
  );
}
