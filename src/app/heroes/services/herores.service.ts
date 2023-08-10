import { Injectable } from '@angular/core';
import {Hero} from "../interfaces/heroe.interfase";
import {HttpClient} from "@angular/common/http";
import {enviroments} from "../../enviroments/enviroments";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroresService {


  private baseUrl: string = enviroments.baseUrl;
  constructor(private httpClient: HttpClient) {
  }


  getHeroes ():Observable<Hero[]>{
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  //el of es una forma de crear observables basados en el valor especificado
  //en los parentesis
  getHeroeById(id:string):Observable<Hero | undefined> {
    return this.httpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe( catchError( error => of(undefined)))
  }


  getSuggestions(query:string):Observable<Hero[]>{
    return  this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }

  //${this.baseUrl}/heroes => endPonint
  //hero => body

  addHero(hero:Hero): Observable<Hero>{
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }


  //patch para realizar una actualización
  updateHero(hero:Hero): Observable<Hero>{
    if (!hero.id) throw Error ( 'Error en el Id es required')
    return this.httpClient.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(id:string): Observable<boolean>{

    return this.httpClient.delete<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
        //aca estoy diciendo que el delete me va a generar un respuesta sea
        //errones o no atraves del catchError o el map
        map(resp => true ),
        catchError( err => of(false) )
    );
  }

}
