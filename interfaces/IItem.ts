export default interface IItem<T> {
  item: T;
  title: string;
  body: string[];
  footer: string;
  status?: string;
  onDelete: (item: T) => void;
  onAddToCart?: (item: T) => void;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
}