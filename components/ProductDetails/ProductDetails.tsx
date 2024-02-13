interface ProductDetailsProps { // TODO: Change types
  product: any,
  onClearSelectionPressed: any,
  show: boolean
}

export default function ProductDetails ({ product, onClearSelectionPressed, show }: ProductDetailsProps) {
  
  if (!show) {
    return null;
  }

  return (
    <div className="overflow-x-hidden overflow-y-scroll justify-center items-center flex flex-grow">
      <span>Product details</span>
    </div>
  );
}