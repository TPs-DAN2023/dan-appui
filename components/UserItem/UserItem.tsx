interface UserItemProps {
  user: {
    id: string;
    username: string;
    correoElectronico: string;
    tipoUsuario: string;
  };
  onClick: any;
}

export default function UserItem({ user, onClick }: UserItemProps) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{user.username}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{user.correoElectronico}</h6>
        <p className="card-text">Tipo usuario: {user.tipoUsuario}</p>
        <button className="btn btn-primary" onClick={() => onClick(user)}>
          Seleccionar
        </button>
      </div>
    </div>
  );
}