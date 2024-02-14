"use client";

import { ViewButton, EditButton, DeleteButton } from "../index";

interface ItemProps {
  item: any;
  title: string;
  body: string[];
  footer: string;
  status?: string;
  onView: (item: any) => void;
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

export default function Item({
  item,
  title,
  body,
  footer,
  status,
  onView,
  onEdit,
  onDelete,
}: ItemProps) {
  return (
    <div className="rounded-lg p-4 cursor-pointer">
      <header className="flex justify-between">
        <p className="text-medium font-bold capitalize overflow-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </p>
        <div className="flex gap-x-3">
          <ViewButton onClick={() => onView(item)} />
          <EditButton onClick={() => onEdit(item)} />
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
              status === "RECIBIDO"
                ? "bg-green-500"
                : status === "CANCELADO"
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
