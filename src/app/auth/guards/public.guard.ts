import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  CanMatch, Route,
  Router,
  RouterStateSnapshot, UrlSegment, UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map, Observable, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor( private authService: AuthService,
               private router: Router
  ) {}

  private checkAuthStatus():Observable<boolean>{
    return  this.authService.checkAunthentication().pipe(
      tap( isAuthenticated => {
        if(isAuthenticated) { this.router.navigate(['./'])} //esto esta regresando un falso
      }),
      map( isAuthenticated => !isAuthenticated)
      // acá atraves del map lo estoy colocando valor opuesto
  )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean>  | boolean  {
    console.log('CanActive')
    console.log(route,state)
    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]):
    Observable<boolean>  | boolean  {
    console.log('CanMatch')
    console.log(route,segments)
    return this.checkAuthStatus();
  }
}
