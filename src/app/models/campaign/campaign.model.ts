import { ID } from '@datorama/akita';

export interface Campaign {
  _id: ID;
  title: string;
  owner: string;
  aboutMe: string; 
  campaignGoals: string; 
  campaignDetails: string; 
  startDate: Date; 
  endDate: Date;
  phenomena: Array<string>;
}


