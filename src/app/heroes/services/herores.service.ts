import { Injectable } from '@angular/core';
import {Hero} from "../interfaces/heroe.interfase";
import {HttpClient} from "@angular/common/http";
import {enviroments} from "../../enviroments/enviroments";
import {catchError, Observable, of} from "rxjs";

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
      .pipe( catchError( error => of(undefined))
      )
  }

  getSuggestions(query:string):Observable<Hero[]>{
    return  this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
  }

}
