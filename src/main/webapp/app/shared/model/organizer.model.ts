import { ITournament } from 'app/shared/model/tournament.model';

export interface IOrganizer {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  tournament?: ITournament;
}

export class Organizer implements IOrganizer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public tournament?: ITournament
  ) {}
}
