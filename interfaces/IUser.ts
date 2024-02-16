import { IUserType } from '.';

export default interface IUser {
  id?: number;
  userName: string;
  password: string;
  correoElectronico: string;
  tipoUsuario?: IUserType | null;
}