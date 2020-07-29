import { BoxQuery } from './../../box/state/box.query';
import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';
import { map, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  isLoggedIn$ = this.select(state => toBoolean(state.user));
  name$ = this.select(state => state.user.name);
  user$ = this.select(state => state.user);

  constructor(protected store: SessionStore, private boxQuery: BoxQuery) {
     super(store);
  }

  isLoggedIn() {
    return toBoolean(window.localStorage.getItem('sb_refreshtoken'));
  }

  selectMyBoxes(){
    return this.select(state => (state.details ? state.details.me : false)).pipe(flatMap(res => {
      console.log(res);
      if(res){
        return this.boxQuery.selectManyWithSensors(res.boxes);
      }
      else {
        return of([]);
      }
    }))
    // console.log(this.boxQuery.selectManyWithSensors(this.getValue().details.me.boxes))
    // return this.boxQuery.selectManyWithSensors(this.getValue().details.me.boxes);
  }
}