"use client";
import { API_URLS } from "@/services";
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
} from "@/components";
import { useState } from "react";
import { extractProductAttributes } from "@/utils";
import { IProduct } from "@/interfaces";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { withAuth } from "@/hocs";
import { useFetch } from "@/hooks";

function Productos() {
  const {
    data: products,
    error,
    isLoading,
  } = useFetch<IProduct[]>(API_URLS.products, "GET");

  const [selectedItem, setSelectedItem] = useState<IProduct>();
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isRemovingFromCart, setIsRemovingFromCart] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  const handleAddToCart = (newStock: number, product?: IProduct) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item: { id: number }) => item.id === product?.id
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
      (item: { id: number }) => item.id === product?.id
    );
    if (existingProductIndex !== -1) {
      cart.splice(existingProductIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const isPopupOpen = isDeletingProduct || isAddingToCart || isRemovingFromCart;

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Layout className={`${isPopupOpen ? "opacity-50" : ""}`}>
        <div className="overflow-x-hidden overflow-y-scroll border-r min-w-[400px]">
          <List<IProduct>
            items={products || []}
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
            onDelete={(item) => {
              setSelectedItem(item as IProduct);
              setIsDeletingProduct(true);
            }}
            renderItem={(
              item,
              onDelete,
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
                (cartItem: { id: number }) => cartItem.id === item.id
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
                ? "Puede editar o eliminar cualquier producto de la lista."
                : "Cree un producto para comenzar."
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
            }}
            product={selectedItem}
          />
        </div>
      </Layout>
      {isPopupOpen && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <ConfirmDeletePopup
            show={isDeletingProduct}
            onDelete={() => {}}
            onCancel={() => setIsDeletingProduct(false)}
            messageTitle={`¿Está seguro que desea eliminar el producto seleccionado (id=${selectedItem?.id})?`}
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
