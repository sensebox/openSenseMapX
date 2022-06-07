import { ID } from "@datorama/akita";

export interface Notification {
  _id: ID;
  message: string;
  user: string;
  room: string;
  date: Date;
  read: boolean;
}
