import { ITeam } from 'app/shared/model/team.model';

export interface ICoach {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  team?: ITeam;
}

export class Coach implements ICoach {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public team?: ITeam
  ) {}
}
