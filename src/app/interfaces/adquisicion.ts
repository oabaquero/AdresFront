export interface Adquisicion {
  id: number;
  presupuesto: number;
  unidadId: number;
  nombreUnidad: string;
  bienId: number;
  nombreBien: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fecha: string;
  proveedorId: number;
  nombreProveedor: string;
  documentacion: string;
}
