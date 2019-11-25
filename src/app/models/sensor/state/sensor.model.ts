import { ID } from '@datorama/akita';
import { Box } from '../../box/state/box.model';
import { Measurement } from '../../measurement/state/measurement.model';

export interface Sensor {
  id: ID;
  box: Box;
  title: string;
  sensorType: string;
  unit: string;
  lastMeasurement: Measurement;
  values: Object;
  rawValues: Object;
}

/**
 * A factory function that creates Sensor
 */
export function createSensor(params: Partial<Sensor>) {
  return {

  } as Sensor;
}
