export interface GarageItem {
  body: number;
  engine: number;
  owner: string;
  fuel: number;
  garage: string;
  hash: number;
  plate: string;
  state: 'out' | 'garaged' | 'impounded' | 'seized' | 'unknown';
  vehicle: string;
  brand: string;
  type: 'car' | 'aircraft' | 'boat' | 'bike';
  model: string;
}
