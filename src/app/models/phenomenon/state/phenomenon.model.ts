import { ID } from '@datorama/akita';

export interface Phenomenon {
  id: ID;
  desc: string;
  label: string;
  rov: ROV[];
  domain: any;
  validation: boolean;
}
  


export interface ROV {
  unit: string;
  min: number;
  max: number;
}