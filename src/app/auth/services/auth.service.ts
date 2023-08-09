import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroments} from "../../enviroments/enviroments";
import {User} from "../interface/interface";
import {catchError, map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = enviroments.baseUrl;
  //cuando no tengamos autenticación => será nulo
  private user?: User;

  constructor(private HttpClient: HttpClient) {
  }

  //voy a exponer el servicio o el usuario
  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    //structuredClone => se utiliza para realizar un clonProfundo o un div clon
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    //
    return this.HttpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', user.id.toString()))
    );
  }

  // localStorage.clear() => que me limpie el localStorage
  logout() {
    this.user = undefined;
    localStorage.clear()
  }

  //boolean => si es correcta la autenticación o no si por lo contrario no lo es
  checkAunthentication(): Observable<boolean>{
    //if(!localStorage.getItem('token')) => si no existe el token
    if (!localStorage.getItem('token')) return of(false);

    const toke = localStorage.getItem('token');

    return this.HttpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),//map = trasnforma y (!!user => doble negacion)
        catchError(err => of(false))//Si ocurre un error, en lugar de detener todo,
        // estás diciendo que quieres hacer algo específico en caso de error
      )
  }

}
