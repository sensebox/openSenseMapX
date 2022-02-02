import { ID } from '@datorama/akita';

export interface Notification {
  _id: ID;
  notifications: Array<any>;
  newNotification: {any};
  unread: Boolean;
  notificationRules: Array<any>;
  notificationConnectors: Array<any>;
}
