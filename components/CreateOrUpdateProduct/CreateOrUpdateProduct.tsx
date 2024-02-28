import React, { useEffect, useState } from "react";
import {
  CreateCategoryPopup,
  CreateProviderPopup,
  Button,
  OpenDialogButton,
  FormInput,
  ConfirmCancelPopup,
} from "@/components";
// import { getProvidersMock, getCategoriesMock, addProductMock } from "@/mocks";
import { ICategory, IProduct, IProvider } from "@/interfaces";
import { API_URLS, apiCall } from "@/services";

interface CreateOrUpdateProductProps {
  show: boolean;
  onCancel: () => void;
  product?: IProduct;
}

const emptyProduct = {
  nombre: "",
  descripcion: "",
  precio: 0,
  stockActual: 0,
  categoria: null,
  proveedor: null,
};

export default function CreateOrUpdateProduct({
  show,
  onCancel,
  product: productToUpdate,
}: CreateOrUpdateProductProps) {
  const [product, setProduct] = useState<IProduct>(emptyProduct);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isCreatingProvider, setIsCreatingProvider] = useState(false);
  const [providers, setProviders] = useState<IProvider[]>([]);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchCategories = await apiCall(`${API_URLS.categories}`, "GET");
        const fetchProviders = await apiCall(`${API_URLS.providers}`, "GET");
        if (!productToUpdate) {
          setCategories(fetchCategories as ICategory[]);
          setProviders(fetchProviders as IProvider[]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (productToUpdate) {
      setProduct(productToUpdate);
    } else {
      setProduct((p) => {
        if (!p) {
          return emptyProduct;
        }
        return p;
      });
      setCategories([]);
      setProviders([]);
    }

    fetchData();
  }, [productToUpdate, show, reFetch]);

  const handleCancel = (event: React.FormEvent) => {
    event.preventDefault();
    setProduct(emptyProduct);
    setIsCanceling(false);
    setIsCreatingCategory(false);
    setIsCreatingProvider(false);
    console.log(
      `Cancelando la ${
        productToUpdate ? "actualización" : "creación"
      } del producto...`
    );
    onCancel();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsCreatingProduct(true);
    try {
      const data = await apiCall(
        `${API_URLS.products}${
          productToUpdate ? `/${productToUpdate.id}` : ""
        }`,
        productToUpdate ? "PUT" : "POST",
        {
          ...product,
          categoriaId: product.categoria?.id,
          proveedorId: product.proveedor?.id,
        }
      );
      console.log(
        `Producto ${productToUpdate ? "actualizado" : "creado"}!`,
        data
      );
      handleCancel(event);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingProduct(false);
    }
  };

  const allInputsAreValid = () => {
    return (
      product.nombre.length < 50 &&
      product.descripcion!.length < 100 &&
      product.precio >= 0 &&
      product.precio <= 10000 &&
      product.stockActual >= 0 &&
      product.stockActual <= 1000 &&
      product.categoria &&
      product.proveedor
    );
  };

  const isPopupOpen = isCreatingCategory || isCreatingProvider || isCanceling;

  if (!show) {
    return null;
  }

  return (
    <div className="relative flex flex-grow items-center justify-center">
      <div
        className={`flex flex-col items-center justify-center ${
          isPopupOpen ? "opacity-50" : ""
        }`}
      >
        <h1 className="text-2xl font-bold">
          {productToUpdate ? "Actualizar" : "Crear"} producto
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <FormInput
            type="text"
            placeholder="Nombre del producto"
            value={product.nombre}
            required
            onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
          />
          <FormInput
            type="text"
            placeholder="Descripción del producto"
            value={product.descripcion}
            required
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
              required
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
            required
            onChange={(e) =>
              setProduct({ ...product, stockActual: parseInt(e.target.value) })
            }
          />
          {/* I need two list one with categories and another with providers for user to select */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center">
              <select
                className="border-2 border-gray-300 p-2 m-2"
                value={product.categoria?.id}
                onFocus={() => setReFetch(!reFetch)}
                required
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
              <OpenDialogButton
                type="button"
                onClick={() => setIsCreatingCategory(true)}
              >
                + Crear categoría
              </OpenDialogButton>
            </div>
            <div className="flex items-center">
              <select
                className="border-2 border-gray-300 p-2 m-2"
                value={product.proveedor?.id}
                onFocus={() => setReFetch(!reFetch)}
                required
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
              <OpenDialogButton
                type="button"
                onClick={() => setIsCreatingProvider(true)}
              >
                + Crear proveedor
              </OpenDialogButton>
            </div>
          </div>
          <footer className="flex justify-around mt-5">
            <Button
              color="red"
              type="button"
              onClick={(event) =>
                productToUpdate ? handleCancel(event) : setIsCanceling(true)
              }
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!allInputsAreValid() || isCreatingProduct}
            >
              {productToUpdate
                ? isCreatingProduct
                  ? "Actualizando..."
                  : "Actualizar"
                : isCreatingProduct
                ? "Creando..."
                : "Crear"}
            </Button>
          </footer>
        </form>
      </div>

      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <CreateCategoryPopup
            show={isCreatingCategory}
            onCancel={() => setIsCreatingCategory(false)}
          />
          <CreateProviderPopup
            show={isCreatingProvider}
            onCancel={() => setIsCreatingProvider(false)}
          />
          <ConfirmCancelPopup
            show={isCanceling}
            onCancel={() => setIsCanceling(false)}
            onConfirm={handleCancel}
            messageTitle="¿Desea cancelar la creación del producto?"
          />
        </div>
      )}
    </div>
  );
}
