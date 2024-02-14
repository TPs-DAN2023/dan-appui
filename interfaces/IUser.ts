import { IUserType } from './IUserType';

export default interface IUser {
  id: number;
  userName: string;
  password: string;
  correoElectronico: string;
  tipoUsuario: IUserType;
}