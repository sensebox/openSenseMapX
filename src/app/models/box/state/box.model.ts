import { ID } from '@datorama/akita';

export interface Box {
  _id: ID;
}

/**
 * A factory function that creates Box
 */
export function createBox(params: Partial<Box>) {
  return {

  } as Box;
}
