import { IPlayer } from 'app/shared/model/player.model';
import { ICoach } from 'app/shared/model/coach.model';
import { ITournament } from 'app/shared/model/tournament.model';

export interface ITeam {
  id?: number;
  name?: string;
  city?: string;
  country?: string;
  players?: IPlayer[];
  coaches?: ICoach[];
  tournament?: ITournament;
}

export class Team implements ITeam {
  constructor(
    public id?: number,
    public name?: string,
    public city?: string,
    public country?: string,
    public players?: IPlayer[],
    public coaches?: ICoach[],
    public tournament?: ITournament
  ) {}
}
