interface ListProps { // TODO: Change items type
  items: any | null;
  onClick: any;
  children: (item: any, onClick: any) => JSX.Element;
}

export default function List({ items, onClick, children }: ListProps) {
  return (
    <ul className="flex flex-col justify-center">
      {items && items.map((item: any) => (
        <article key={item.id} className="m-4 rounded-lg bg-blue-300 opacity-85">
          {children(item, onClick)}
        </article>
      ))}
      <span className="text-lg text-center mb-5">
        No hay más ítems que mostrar.
      </span>
    </ul>
  );
}