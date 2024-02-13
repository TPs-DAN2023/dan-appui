import Link from 'next/link';

interface CustomButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
}

export default function CustomButton({ text, href, onClick }: CustomButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">{text}</span>
      </Link>
    );
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >{text}</button>
  );
}