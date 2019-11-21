import { ID } from '@datorama/akita';

export interface Box {
  _id: ID;
  name: string;
  sensors: any[];
  lastMeasurementAt: string;
  values: any;
}

/**
 * A factory function that creates Box
 */
export function createBox(params: Partial<Box>) {
  return {

  } as Box;
}
