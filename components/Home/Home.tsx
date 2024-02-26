import { Button } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

interface HomeProps {
  show: boolean;
  icon?: any;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  showButton?: boolean;
}

export default function Home({
  show,
  icon = faQuestionCircle,
  title,
  subtitle,
  description,
  buttonText,
  onClick,
  showButton = true,
}: HomeProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="flex flex-1 items-center justify-center flex-col gap-y-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div className="flex flex-col items-center space-y-4 px-4 py-10 rounded-xl bg-blue-300 mx-4 sm:mx-4 md:mx-20">
        <FontAwesomeIcon icon={icon} className="w-14 h-14" />
        <p className="text-xl text-center">{subtitle}</p>
        <hr />
        <p className="text-medium text-center">{description}</p>
      </div>
      {showButton && <Button onClick={onClick}>{buttonText}</Button>}
    </div>
  );
}
