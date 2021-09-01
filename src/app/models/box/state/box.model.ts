import { ID } from '@datorama/akita';
import { Sensor } from '../../sensor/state/sensor.model';

export interface Box {
  _id: ID;
  name: string;
  sensors: ID[];
  lastMeasurementAt: string;
  values: any;
  sensorWikiModel: string;
  script: string;
}

/**
 * A factory function that creates Box
 */
export function createBox(params: Partial<Box>) {
  return {

  } as Box;
}
