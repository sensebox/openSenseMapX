import { ID } from '@datorama/akita';

export interface Measurement {
  id: ID;
  value: any;
  createdAt: Date;
}

/**
 * A factory function that creates Measurement
 */
export function createMeasurement(params: Partial<Measurement>) {
  return {

  } as Measurement;
}
