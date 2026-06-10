export interface PcStationProps {
  number: number; // Número (ex: PC 01, PC 02)
  cpu: string; // Modelo da CPU
  gpu: string; // Modelo da GPU
  ram: number; // Quantidade de RAM em GB
  storage: number; // Quantidade de armazenamento em GB
  isUnderMaintenance: boolean; // Indica se o PC está em manutenção
}

export class PcStation {
  private _id: string;
  private _props: PcStationProps;

  private constructor(id: string, props: PcStationProps) {
    this._id = id;
    this._props = props;
  }

  public static create(id: string, props: PcStationProps): PcStation {
    return new PcStation(id, props);
  }

  //Getters
  get id(): string {
    return this._id;
  }
  get number(): number {
    return this._props.number;
  }
  get cpu(): string {
    return this._props.cpu;
  }
  get gpu(): string {
    return this._props.gpu;
  }
  get ram(): number {
    return this._props.ram;
  }
  get storage(): number {
    return this._props.storage;
  }
  get isUnderMaintenance(): boolean | undefined {
    return this._props.isUnderMaintenance;
  }
}
