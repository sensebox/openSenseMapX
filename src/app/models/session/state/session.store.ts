import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { User } from './session.model';
// import * as storage from "../storage";

export type SessionState = {
  token: string;
  refreshToken: string;
  user: User;
  details: any;
}

export function createInitialSessionState(): SessionState {
  return {
    token: null,
    refreshToken: null,
    user: null,
    details: null
    // ...storage.getSession(),
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: "session" })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialSessionState());
  }

  login(session: SessionState) {
    this.update(session);
    // storage.saveSession(session);
  }

  logout() {
    // storage.clearSesssion();
    window.localStorage.removeItem('sb_accesstoken');
    window.localStorage.removeItem('sb_refreshtoken');
    this.update(createInitialSessionState());
  }
}