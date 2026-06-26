export interface ListPcStationsFilterInput {
  status?: 'all' | 'maintenance' | 'available';
  cpu?: string;
  gpu?: string;
  ram?: number;
  storage?: number;
}
