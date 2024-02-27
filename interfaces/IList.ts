import { IIdentifiable } from ".";

export default interface IList<T extends IIdentifiable> {
  items: T[];
  onDelete: (item: T) => void;
  renderItem: (item: T, onDelete: (item: T) => void, onChangeOrderState?: (item: T) => void, onUpdateStock?: (item: T) => void,  onRemoveFromCart?: (item: T) => void, onAddToCart?: (item: T) => void, onEdit?: (item: T) => void, onView?: (item: T) => void) => JSX.Element;
  onUpdateStock?: (item: T) => void;
  onChangeOrderState?: (item: T) => void;
  onRemoveFromCart?: (item: T) => void;
  onAddToCart?: (item: T) => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
}