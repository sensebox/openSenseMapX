import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { SessionStore } from './session.store';
import { SessionQuery } from './session.query';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class SessionService {

  AUTH_API_URL = environment.api_url;

  constructor(
    private sessionStore: SessionStore, 
    private sessionQuery: SessionQuery, 
    private router: Router,
    private http: HttpClient) {

  }

  login(creds){

    this.sessionStore.setLoading(true);
    this.http.post(`${environment.api_url}/users/sign-in`, creds).subscribe((res:any) => {
      window.localStorage.setItem('sb_accesstoken', res.token);
        window.localStorage.setItem('sb_refreshtoken', res.refreshToken);
        this.sessionStore.update(state => {return {
            token: res.token, 
            refreshToken: res.refreshToken, 
            user: res.data.user }});
        this.sessionStore.setLoading(false);
        this.getUserDetails();
        this.router.navigate([{ outlets: { sidebar: [ 'dashboard'] }}]);
        

    }, err => {
      console.log(err);
    });
  }


  logout(){
    window.localStorage.removeItem('sb_accesstoken');
    window.localStorage.removeItem('sb_refreshtoken');
    this.sessionStore.logout()
  }

  getAccessToken(){
    return window.localStorage.getItem('sb_accesstoken');
  }

  refreshAccessToken(){
    return new Observable(observer => {
      return this.http.post(this.AUTH_API_URL + '/users/refresh-auth', {token: window.localStorage.getItem('sb_refreshtoken')})
          .subscribe((response:any) => {
            window.localStorage.setItem('sb_accesstoken', response.token);
            window.localStorage.setItem('sb_refreshtoken', response.refreshToken);           
            this.sessionStore.update(state => {return {
              user: response.data.user }});
            observer.next(response.refreshToken);
            observer.complete();
          }, (err) => {
            const error = err && err.errorMessage ? err.errorMessage : 'Error';
            observer.error({error});
          });
      });
  }

  recoverSession(token){
    this.http.post(this.AUTH_API_URL + '/users/refresh-auth', {token: token}).subscribe((res:any) => {
      
      this.sessionStore.update(state => {
        return {user: res.data.user}
      });
      window.localStorage.setItem('sb_accesstoken', res.token);
      window.localStorage.setItem('sb_refreshtoken', res.refreshToken);
      this.getUserDetails();

    }, err => {
      console.log(err);
      // this.errorMessage$.next(err.error.message);
    });
  }

  getUserDetails(){
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+window.localStorage.getItem('sb_accesstoken'));

    this.http.get(this.AUTH_API_URL + '/users/me', {headers: headers}).subscribe((res:any) => {
      
      this.sessionStore.update(state => {

        return {details: res.data}
      });
    }, err => {
      console.log(err);
      // this.errorMessage$.next(err.error.message);
    });

  }
}
