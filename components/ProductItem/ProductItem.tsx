interface ProductItemProps {
  product: {
    id: number;
    nombre: string;
    descripcion: string;
    proveedor: string;
    stockActual: number;
    precio: number;
  };
  onClick: any;
}

export default function ProductItem({ product, onClick }: ProductItemProps ) {

  const isAvailable = product.stockActual > 0;

  return (
    // <div className="rounded-lg p-4 cursor-pointer" onClick={() => onClick(product)}>
    //   <p className="text-medium font-bold capitalize overflow-ellipsis overflow-hidden whitespace-nowrap">
    //     {`Id de Producto: ${product.id}`}
    //   </p>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.nombre}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{product.proveedor}</h6>
        <p className="card-text">{product.descripcion}</p>
        <p className="card-text">Stock actual: {product.stockActual}</p>
        <p className="card-text">Precio: {product.precio}</p>
        <button
          className={`btn btn-${isAvailable ? "primary" : "secondary"}`}
          onClick={() => onClick(product)}
          disabled={!isAvailable}
        >
          {isAvailable ? "Seleccionar" : "No disponible"}
        </button>
      </div>
    </div>
  );
}