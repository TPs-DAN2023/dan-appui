import { IIdentifiable } from ".";

export default interface IList<T extends IIdentifiable> {
  items: T[];
  onView?: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  renderItem: (item: T, onEdit: (item: T) => void, onDelete: (item: T) => void, onView?: (item: T) => void) => JSX.Element;
}