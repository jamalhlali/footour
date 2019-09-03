import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { ITeam } from 'app/shared/model/team.model';
import { IOrganizer } from 'app/shared/model/organizer.model';

export interface ITournament {
  id?: number;
  name?: string;
  startDate?: Moment;
  location?: ILocation;
  teams?: ITeam[];
  organizers?: IOrganizer[];
}

export class Tournament implements ITournament {
  constructor(
    public id?: number,
    public name?: string,
    public startDate?: Moment,
    public location?: ILocation,
    public teams?: ITeam[],
    public organizers?: IOrganizer[]
  ) {}
}
