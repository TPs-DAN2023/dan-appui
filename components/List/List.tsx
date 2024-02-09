interface ListProps {
  items: any[] | null;
  onClick: any;
  children: (item: any, onClick: any) => JSX.Element;
}

export default function List({ items, onClick, children }: ListProps) {
  return (
    <ul>
      {items && items.map((item: any) => (
        <article key={item.id} className="m-4 rounded-lg bg-blue-300 opacity-85       hover:scale-105 hover:opacity-100 transition-all">
          {children(item, onClick)}
        </article>
      ))}
      <span className="text-xl text-center">
        No hay más ítems que mostrar...
      </span>
    </ul>
  );
}