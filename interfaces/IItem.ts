export default interface IItem<T> {
  item: T;
  title: string;
  body: string[];
  footer: string;
  status?: string;
  onDelete: (item: T) => void;
  onChangeOrderState?: (item: T) => void;
  onUpdateStock?: (item: T) => void;
  disabledAddToCartButton?: boolean;
  onRemoveFromCart?: (item: T) => void;
  onAddToCart?: (item: T) => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
}