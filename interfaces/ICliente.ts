export default interface ICliente {
  id?: number;
  correoElectronico: string;
  cuit: string;
  deuda: number;
  maximoCuentaCorriente: number;
  razonSocial: string;
}