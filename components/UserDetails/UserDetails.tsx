import { IUser } from "@/interfaces";

interface UserDetailsProps {
  user: IUser;
  onClearSelectionPressed: any;
  show: boolean;
}

export default function UserDetails({
  user,
  onClearSelectionPressed,
  show,
}: UserDetailsProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="overflow-x-hidden overflow-y-scroll justify-center items-center flex flex-grow">
      <span>User details</span>
    </div>
  );
}
