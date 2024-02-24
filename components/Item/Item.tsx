"use client";

import { IItem } from "@/interfaces";
import { IconButton } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faCartPlus,
  faEdit,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { hasUserType } from "@/utils";
import { USER_TYPES } from "@/constants";

export default function Item<T>({
  item,
  title,
  body,
  footer,
  status,
  onDelete,
  disabledAddToCartButton,
  onRemoveFromCart,
  onAddToCart,
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
            <IconButton onClick={() => onRemoveFromCart(item)}>
              <FontAwesomeIcon icon={faCartArrowDown} color="red" />
            </IconButton>
          )}
          {onAddToCart && (
            <IconButton
              onClick={() => onAddToCart(item)}
              disabled={disabledAddToCartButton}
            >
              <FontAwesomeIcon
                icon={faCartPlus}
                color={disabledAddToCartButton ? "gray" : "green"}
              />
            </IconButton>
          )}
          {onView && (
            <IconButton onClick={() => onView(item)}>
              <FontAwesomeIcon icon={faEye} />
            </IconButton>
          )}
          {onEdit && hasUserType(USER_TYPES.ADMIN) && (
            <IconButton onClick={() => onEdit(item)}>
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
          )}
          {hasUserType(USER_TYPES.ADMIN) && (
            <IconButton onClick={() => onDelete(item)}>
              <FontAwesomeIcon icon={faTrash} color="red" />
            </IconButton>
          )}
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
