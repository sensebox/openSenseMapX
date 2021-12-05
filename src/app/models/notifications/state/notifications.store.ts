import { Injectable } from '@angular/core';
import { Notification } from './notifications.model';
import { EntityState, EntityStore, StoreConfig, MultiActiveState, EntityUIStore } from '@datorama/akita';

export interface NotificationsState extends EntityState<Notification>, MultiActiveState {}


const initialState = {
  areNotificationsLoaded: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Notification' , idKey: "_id"})
export class NotificationsStore extends EntityStore<NotificationsState> {


  constructor() {
    super(initialState);
  }
}