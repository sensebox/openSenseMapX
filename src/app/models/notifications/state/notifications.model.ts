import { ID } from '@datorama/akita';

export interface Notification {
  _id: ID;
  notifications: Array<any>;
  notificationRules: Array<any>;
}
