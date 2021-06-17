import { SessionQuery } from './../../../models/session/state/session.query';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { take } from 'rxjs/internal/operators/take';
// import { map } from 'rxjs/operators';
// import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sessionQuery: SessionQuery, private router: Router) {}

  canActivate() {
    if (this.sessionQuery.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate([{ outlets: {sidebar : 'login'}}])
      return false;
    }
  }
}
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardAdmin implements CanActivate {
//   constructor(private store: Store<fromAuth.State>) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.store
//       .select(fromAuth.getUser)
//       .map(user => {
//         if (!user || user.role != 'admin') {
//           this.store.dispatch(new Auth.LoginRedirect(state.url));
//           return false;
//         }
//         return true;
//       })
//       .take(1);
//   }
// }
