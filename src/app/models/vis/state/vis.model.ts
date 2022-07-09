import { ID } from '@datorama/akita';

export interface Vis {
  _id: ID;
  name: string;
  bbox: Number[];
  pheno: any;
  dateRange: any;
}
