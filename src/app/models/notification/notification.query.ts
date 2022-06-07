import { Injectable } from "@angular/core";
import { Query, QueryEntity } from "@datorama/akita";
import { NotificationStore, NotificationState } from "./Notification.store";

@Injectable({ providedIn: "root" })
export class NotificationQuery extends QueryEntity<NotificationState> {
  constructor(protected store: NotificationStore) {
    super(store);
  }
}
