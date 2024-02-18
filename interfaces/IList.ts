import { IIdentifiable } from ".";

export default interface IList<T extends IIdentifiable> {
  items: T[];
  onDelete: (item: T) => void;
  onRemoveFromCart?: (item: T) => void;
  onAddToCart?: (item: T) => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  renderItem: (item: T, onDelete: (item: T) => void, onRemoveFromCart?: (item: T) => void, onAddToCart?: (item: T) => void, onEdit?: (item: T) => void, onView?: (item: T) => void) => JSX.Element;
}