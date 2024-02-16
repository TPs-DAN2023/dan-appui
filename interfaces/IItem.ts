export default interface IItem<T> {
  item: T;
  title: string;
  body: string[];
  footer: string;
  status?: string;
  onView?: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}