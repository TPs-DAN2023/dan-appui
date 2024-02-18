"use client";

import { IItem } from "@/interfaces";
import {
  ViewButton,
  EditButton,
  DeleteButton,
  AddToCartButton,
  RemoveFromCartButton,
} from "../index";

export default function Item<T>({
  item,
  title,
  body,
  footer,
  status,
  onDelete,
  onRemoveFromCart,
  onAddToCart,
  disabledAddToCartButton,
  onEdit,
  onView,
}: IItem<T>) {
  return (
    <div className="rounded-lg p-4">
      <header className="flex justify-between">
        <p className="text-medium font-bold capitalize overflow-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </p>
        <div className="flex gap-x-3">
          {onRemoveFromCart && (
            <RemoveFromCartButton onClick={() => onRemoveFromCart(item)} />
          )}
          {onAddToCart && (
            <AddToCartButton
              onClick={() => onAddToCart(item)}
              disabled={disabledAddToCartButton}
            />
          )}
          {onView && <ViewButton onClick={() => onView(item)} />}
          {onEdit && <EditButton onClick={() => onEdit(item)} />}
          <DeleteButton onClick={() => onDelete(item)} />
        </div>
      </header>
      <hr className="mt-2 mb-1 border border-blue-400" />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          {body.map((item, index) => (
            <p
              key={index}
              className="overflow-ellipsis overflow-hidden whitespace-nowrap mr-2 text-small"
            >
              {item}
            </p>
          ))}
        </div>
        {status && (
          <span
            className={`px-2 py-1 rounded text-sm ${
              status === "RECIBIDO" || status === "ENVIADO"
                ? "bg-green-500"
                : status === "CANCELADO" || status === "RECHAZADO"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          >
            {status}
          </span>
        )}
      </div>
      <hr className="mt-1 mb-1 border border-blue-400" />
      <p className="text-xs italic mt-1">{footer}</p>
    </div>
  );
}
