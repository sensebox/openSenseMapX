import { ID } from "@datorama/akita";

export interface Notification {
  _id: ID;
  badgeId: string;
  created_at: Date;
  email: string;
  image: string;
  is_read: boolean;
  message: string;
  reciever: string;
}
