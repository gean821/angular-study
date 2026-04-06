export interface Product {
  id: number;
  nome: string;
  codigoEan: string;
  localDescargaId: number;
  localDescarga?: string;
}