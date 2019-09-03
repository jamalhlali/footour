import { ITeam } from 'app/shared/model/team.model';

export interface IPlayer {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  yearOfBirth?: number;
  team?: ITeam;
}

export class Player implements IPlayer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public yearOfBirth?: number,
    public team?: ITeam
  ) {}
}
