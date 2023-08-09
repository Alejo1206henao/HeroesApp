import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
} from "@angular/router";
import {Observable, tap} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {
  constructor( private authService: AuthService,
               private router: Router
  ) {}

  private checkAuthStatus():Observable<boolean>{
    return  this.authService.checkAunthentication().pipe(
      tap( isAuthenticated => {
        if(!isAuthenticated) this.router.navigate(['./auth/login'])
      }  )
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

// CanMatch => entrar a una ruta que haga cierto match del URL
// CanActivate => pueda activar la ruta en particular ó la ruta donde se coloco el guard
