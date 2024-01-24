export interface GarageItem {
  body: number;
  engine: number;
  citizenid: string;
  fuel: number;
  garage: string;
  hash: string;
  plate: string;
  state: 'out' | 'garaged' | 'impounded' | 'seized' | 'unknown';
  vehicle: string;
  brand: string;
  type: 'car' | 'aircraft' | 'boat' | 'bike';
  model: string;
}
