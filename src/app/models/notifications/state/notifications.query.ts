import { BoxQuery } from '../../box/state/box.query';
import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { NotificationsStore, NotificationsState } from './notifications.store';
import { map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { VisQuery } from '../../vis/state/vis.query';

@Injectable({ providedIn: 'root' })
export class NotificationsQuery extends Query<NotificationsState> {
  notifications$ = this.select(state => {
    return state.notifications;
  });

  areNotificationsLoaded$ = this.select(state => {
    return state.areNotificationsLoaded;
  });

  notificationRules$ = this.select(state => {
    return state.notificationRules;
  });
  
  constructor(protected store: NotificationsStore) {
    super(store);
  }
}