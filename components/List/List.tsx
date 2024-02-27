import { IIdentifiable, IList } from "@/interfaces";

export default function List<T extends IIdentifiable>({
  items,
  onDelete,
  renderItem,
  onChangeOrderState,
  onUpdateStock,
  onRemoveFromCart,
  onAddToCart,
  onEdit,
  onView,
}: IList<T>) {
  return (
    <ul className="flex flex-col justify-center">
      {items &&
        items.map((item: T) => (
          <article
            key={item.id}
            className="m-4 rounded-lg bg-blue-300 opacity-85"
          >
            {renderItem(
              item,
              onDelete,
              onChangeOrderState,
              onUpdateStock,
              onRemoveFromCart,
              onAddToCart,
              onEdit,
              onView
            )}
          </article>
        ))}
      <span className="text-lg text-center mb-5">
        No hay más ítems que mostrar.
      </span>
    </ul>
  );
}
