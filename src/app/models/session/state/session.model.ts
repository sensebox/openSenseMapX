import { ID } from '@datorama/akita';

export interface User {
  _id: ID;
  name: string;
  vis: string[];
  boxes: string[];
}

/**
 * A factory function that creates User
 */
export function createBox(params: Partial<User>) {
  return {

  } as User;
}
