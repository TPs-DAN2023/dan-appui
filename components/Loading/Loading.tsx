export default function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      <p className="mt-4 text-center">Cargando...</p>
    </div>
  );
}