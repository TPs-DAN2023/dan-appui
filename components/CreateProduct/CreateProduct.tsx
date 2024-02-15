import { useEffect, useState } from "react";
import {
  CreateCategoryPopup,
  CreateProviderPopup,
  ConfirmButton,
  CancelButton,
  OpenDialogButton,
  FormInput,
} from "@/components";
import { getProvidersMock, getCategoriesMock, addProductMock } from "@/mocks";
import { ICategory, IProduct, IProvider } from "@/interfaces";
import ConfirmCancelPopup from "../ConfirmCancelPopup/ConfirmCancelPopup";

interface CreateProductProps {
  show: boolean;
  onCancel: () => void;
}

export default function CreateProduct({ show, onCancel }: CreateProductProps) {
  const initialProductState = {
    nombre: "",
    descripcion: "",
    precio: 0,
    stockActual: 0,
    categoria: null,
    proveedor: null,
  };

  const [product, setProduct] = useState<IProduct>(initialProductState);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isCreatingProvider, setIsCreatingProvider] = useState(false);
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [isCanceling, setIsCanceling] = useState(false);

  const fetchCategories = async () => {
    // Here you can call your API to fetch the providers
    // const res = await fetch("http://localhost/api/categorias");
    console.log("Fetching categories...");
    const res = await getCategoriesMock();
    // const data = await res.json();
    const data = res;
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setCategories(data);
  };

  const fetchProviders = async () => {
    // Here you can call your API to fetch the providers
    // const res = await fetch("http://localhost/api/proveedores");
    console.log("Fetching providers...");
    const res = await getProvidersMock();
    // const data = await res.json();
    const data = res;
    if (!data) {
      return {
        notFound: true,
      };
    }
    console.log(data);
    setProviders(data);
  };

  const handleCancel = (event: any) => {
    event.preventDefault();
    setProduct(initialProductState);
    onCancel();
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can call your API to create the provider
    console.log(`Producto creado!`);
    addProductMock(product).then((data) => {
      console.log(data);
      onCancel();
    });
  };

  const allInputsAreValid = () => {
    return (
      product.nombre.length > 0 &&
      product.descripcion.length > 0 &&
      product.precio > 0 &&
      product.stockActual >= 0 &&
      product.categoria &&
      product.proveedor
    );
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
          <FormInput
            type="text"
            placeholder="Nombre del producto"
            value={product.nombre}
            onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
          />
          <FormInput
            type="text"
            placeholder="Descripción del producto"
            value={product.descripcion}
            onChange={(e) =>
              setProduct({ ...product, descripcion: e.target.value })
            }
          />

          <div className="flex items-center">
            <span>$</span>
            <FormInput
              type="number"
              placeholder="Precio del producto"
              min="0"
              className="flex-grow"
              value={product.precio}
              onChange={(e) =>
                setProduct({ ...product, precio: parseInt(e.target.value) })
              }
            />
          </div>
          <FormInput
            type="number"
            placeholder="Stock inicial"
            min="0"
            value={product.stockActual}
            onChange={(e) =>
              setProduct({ ...product, stockActual: parseInt(e.target.value) })
            }
          />
          {/* I need two list one with categories and another with providers for user to select */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <select
                className="border-2 border-gray-300 p-2 m-2"
                onClick={fetchCategories}
                value={product.categoria?.id}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    categoria: categories.find(
                      (category) => category.id === parseInt(e.target.value)
                    ),
                  })
                }
              >
                <option value="" hidden>
                  Seleccione una categoría
                </option>
                {categories.map((category: ICategory) => (
                  <option key={category.id} value={category.id}>
                    {category.nombre} (id={category.id})
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
                value={product.proveedor?.id}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    proveedor: providers.find(
                      (provider) => provider.id === parseInt(e.target.value)
                    ),
                  })
                }
              >
                <option value="" hidden>
                  Seleccione un proveedor
                </option>
                {providers.map((provider: IProvider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.nombre} (id={provider.id})
                  </option>
                ))}
              </select>
              <OpenDialogButton onClick={() => setIsCreatingProvider(true)}>
                + Crear proveedor
              </OpenDialogButton>
            </div>
          </div>
          <footer className="flex justify-around mt-5">
            <CancelButton type="button" onClick={() => setIsCanceling(true)}>
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
          <CreateCategoryPopup onCancel={() => setIsCreatingCategory(false)} />
        </div>
      )}

      {isCreatingProvider && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CreateProviderPopup onCancel={() => setIsCreatingProvider(false)} />
        </div>
      )}

      {isCanceling && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <ConfirmCancelPopup
            onCancel={() => setIsCanceling(false)}
            onConfirm={handleCancel}
          />
        </div>
      )}
    </div>
  );
}
