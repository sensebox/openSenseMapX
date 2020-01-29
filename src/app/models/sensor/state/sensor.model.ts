import { ID } from '@datorama/akita';
import { Box } from '../../box/state/box.model';

export interface Sensor {
  id: ID;
  box: Box;
  title: string;
  sensorType: string;
  unit: string;
  lastMeasurement: Object;
  values: Object;
  rawValues: Object;
  boxes_id: string;
  boxes_name: string;
}

/**
 * A factory function that creates Sensor
 */
export function createSensor(params: Partial<Sensor>) {
  return {

  } as Sensor;
}
