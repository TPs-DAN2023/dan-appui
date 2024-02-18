import { IIdentifiable } from ".";

export default interface IList<T extends IIdentifiable> {
  items: T[];
  onAddToCart?: (item: T) => void;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete: (item: T) => void;
  renderItem: (item: T, onDelete: (item: T) => void, onAddToCart?: (item: T) => void, onView?: (item: T) => void, onEdit?: (item: T) => void) => JSX.Element;
}