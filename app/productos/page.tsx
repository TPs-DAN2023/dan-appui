"use client";
import { API_URLS, apiCall } from "@/services";
import {
  List,
  Layout,
  Home,
  Item,
  Loading,
  ConfirmDeletePopup,
  CreateOrUpdateProduct,
  AddToCartPopup,
  RemoveFromCartPopup,
  Error,
  UpdateStockPopup,
} from "@/components";
import { useEffect, useState } from "react";
import { extractProductAttributes, hasUserType } from "@/utils";
import { IProduct } from "@/interfaces";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "@/hocs";
import { USER_TYPES } from "@/constants";

function Productos() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedItem, setSelectedItem] = useState<IProduct>();
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [isUpdatingStock, setIsUpdatingStock] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const data = await apiCall<IProduct[]>(API_URLS.products, "GET");
        setProducts(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [reFetch]);

  const handleAddToCart = (newStock: number, product?: IProduct) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item: { product: IProduct; selectedStock: number }) =>
        item.product.id === product?.id
    );

    // Update the quantity if the new quantity is not 0
    if (existingProductIndex !== -1 && newStock !== 0) {
      cart[existingProductIndex].selectedStock =
        cart[existingProductIndex].selectedStock + newStock;
    } else {
      // Add the product to the cart
      const productAndStock = {
        product,
        selectedStock: newStock,
      };
      cart.push(productAndStock);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setIsAddingToCart(false);
  };

  const handleRemoveFromCart = (product?: IProduct) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: { product: IProduct; selectedStock: number }) =>
        item.product.id === product?.id
    );

    if (existingProductIndex !== -1) {
      cart.splice(existingProductIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleDelete = async () => {
    try {
      const data = await apiCall(
        `${API_URLS.products}/${selectedItem?.id}`,
        "DELETE"
      );
      console.log("Producto eliminado!", data);
    } catch (error) {
      console.error(error);
    } finally {
      setReFetch(!reFetch);
      setIsDeletingProduct(false);
      setSelectedItem(undefined);
    }
  };

  const isPopupOpen =
    isDeletingProduct ||
    isAddingToCart ||
    isRemovingFromCart ||
    isUpdatingStock;

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <>
      <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
        <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
          <List<IProduct>
            items={products || []}
            onDelete={(item) => {
              setSelectedItem(item as IProduct);
              setIsDeletingProduct(true);
            }}
            onUpdateStock={(item) => {
              setSelectedItem(item as IProduct);
              setIsUpdatingStock(true);
            }}
            onRemoveFromCart={(item) => {
              setSelectedItem(item as IProduct);
              setIsRemovingFromCart(true);
            }}
            onAddToCart={(item) => {
              setSelectedItem(item as IProduct);
              setIsAddingToCart(true);
            }}
            onEdit={(item) => {
              setSelectedItem(item as IProduct);
              setIsUpdatingProduct(true);
            }}
            renderItem={(
              item,
              onDelete,
              onChangeOrderState,
              onUpdateStock,
              onRemoveFromCart,
              onAddToCart,
              onEdit
            ) => {
              const productAttributes = extractProductAttributes(
                item as IProduct
              );

              // Check if the product is in the cart and if it is at max stock
              const cart = JSON.parse(localStorage.getItem("cart") || "[]");
              const cartItem = cart.find(
                (cartItem: { product: IProduct; selectedStock: number }) =>
                  cartItem.product.id === item.id
              );
              const isInCart = Boolean(cartItem);
              const isAtMaxStock =
                cartItem && cartItem.selectedStock === item.stockActual;
              return (
                <Item
                  item={item}
                  title={productAttributes.title}
                  body={productAttributes.body}
                  footer={productAttributes.footer}
                  status={productAttributes.status}
                  onDelete={() => onDelete(item)}
                  disabledAddToCartButton={isAtMaxStock}
                  onUpdateStock={() => onUpdateStock && onUpdateStock(item)}
                  onRemoveFromCart={
                    isInCart
                      ? () => onRemoveFromCart && onRemoveFromCart(item)
                      : undefined
                  }
                  onAddToCart={() => onAddToCart && onAddToCart(item)}
                  onEdit={() => onEdit && onEdit(item)}
                />
              );
            }}
          />
        </div>

        <div className="flex flex-col flex-grow overflow-x-hidden overflow-y-scroll">
          <Home
            show={!isUpdatingProduct && !isCreatingProduct}
            icon={
              products && products.length > 0 ? faBasketShopping : undefined
            }
            title="Productos"
            subtitle={
              products && products.length > 0
                ? "Lista de productos"
                : "No existen productos creados"
            }
            description={
              products && products.length > 0
                ? hasUserType(USER_TYPES.ADMIN)
                  ? "Puede editar o eliminar cualquier producto de la lista."
                  : "Puede agregar a su carrito cualquier producto que tenga stock disponible."
                : hasUserType(USER_TYPES.ADMIN)
                ? "Cree un producto para comenzar."
                : "No hay productos existentes en este momento."
            }
            buttonText="Crear producto"
            onClick={() => setIsCreatingProduct(true)}
          />
          <CreateOrUpdateProduct
            show={isCreatingProduct || isUpdatingProduct}
            onCancel={() => {
              setIsUpdatingProduct(false);
              setIsCreatingProduct(false);
              setSelectedItem(undefined);
              setReFetch(!reFetch);
            }}
            product={selectedItem}
          />
        </div>
      </Layout>
      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <ConfirmDeletePopup
            show={isDeletingProduct}
            onDelete={handleDelete}
            onCancel={() => setIsDeletingProduct(false)}
            messageTitle={`¿Está seguro que desea eliminar el producto seleccionado (id=${selectedItem?.id})?`}
          />
          <UpdateStockPopup
            show={isUpdatingStock}
            product={selectedItem}
            onCancel={() => setIsUpdatingStock(false)}
          />
          <AddToCartPopup
            show={isAddingToCart}
            product={selectedItem}
            onCancel={() => setIsAddingToCart(false)}
            onAddToCart={handleAddToCart}
          />
          <RemoveFromCartPopup
            show={isRemovingFromCart}
            product={selectedItem}
            onCancel={() => setIsRemovingFromCart(false)}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </div>
      )}
    </>
  );
}

export default withAuth(Productos);
