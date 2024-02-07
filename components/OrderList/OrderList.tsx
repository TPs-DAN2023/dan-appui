import { OrderListElement } from "..";

interface OrderListProps {
  pedidos: any[] | null;
  setSelected: any;
}

export default function OrderList({ pedidos, setSelected }: OrderListProps) {
  return (
    <ul className="bg-green-700">
      {pedidos && pedidos!.map((p, index) => (
        <article key={p.id}>
          <OrderListElement pedido={p} setSelected={setSelected} />
          {pedidos && pedidos!.length == index + 1 && (
            <span>
              No hay mas...
            </span>
          )}
        </article>
      ))}
    </ul>
  );
}