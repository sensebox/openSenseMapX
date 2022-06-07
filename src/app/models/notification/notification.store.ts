import { Injectable } from "@angular/core";
import { Notification } from "./notification.model";
import {
  EntityState,
  EntityStore,
  StoreConfig,
  MultiActiveState,
  EntityUIStore,
} from "@datorama/akita";

export interface NotificationState
  extends EntityState<Notification>,
    MultiActiveState {}

const initialState = {};

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "Notification", idKey: "label" })
export class NotificationStore extends EntityStore<NotificationState> {
  constructor() {
    super(initialState);
  }
}
