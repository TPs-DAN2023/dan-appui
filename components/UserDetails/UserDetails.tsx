interface UserDetailsProps { // TODO: Change types
  user: any,
  onClearSelectionPressed: any,
  show: boolean
}

export default function UserDetails ({ user, onClearSelectionPressed, show }: UserDetailsProps) {

  if (!show) {
    return null;
  }

  return (
    <div className="overflow-x-hidden overflow-y-scroll justify-center items-center flex flex-grow">
      <span>User details</span>
    </div>
  );
}