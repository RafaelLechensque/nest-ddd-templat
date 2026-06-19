import { PcStation } from '../../../pcs/domain/entities/pc-station.entity';
import { RoomType } from '../enums/room-type.enum';

export interface IGameRoom {
  name: string; //(ex: "Arena 5v5", "Sala Streamer VIP")
  type: RoomType; //(VIP, STANDARD, STREAMER, TOURNAMENT_ZONE)
  stations: PcStation[]; // (Lista de entidades internas)
}

export class GameRoom {
  private _id: string; //(UUID)
  private _props: IGameRoom;

  private constructor(id: string, props: IGameRoom) {
    this._id = id;
    this._props = props;
  }

  public static create(id: string, props: IGameRoom): GameRoom {
    // Validações de regras de negócio podem ser feitas aqui
    if (!props.name || props.name.trim() === '') {
      throw new Error('Sala de jogo deve ter um nome válido.');
    }
    // if (!props.stations || props.stations.length <= 0) {
    //   throw new Error(
    //     'Sala de jogo deve ter pelo menos uma estação de jogo válida.',
    //   );
    // }

    // props.stations.forEach((pc) => {
    //   if (pc.isUnderMaintenance) {
    //     throw new Error(
    //       `O PC ${pc.number} está em manutenção e não pode ser adicionado à sala de jogo.`,
    //     );
    //   }
    // });

    if (props.stations.length > 0) {
      props.stations.forEach((pc) => {
        if (pc.isUnderMaintenance) {
          throw new Error(
            `O PC ${pc.number} está em manutenção e não pode ser adicionado à sala de jogo.`,
          );
        }
      });
    }
    return new GameRoom(id, props);
  }

  //Getters
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._props.name;
  }
  get type(): RoomType {
    return this._props.type;
  }
  get stations(): PcStation[] {
    return this._props.stations;
  }
}
