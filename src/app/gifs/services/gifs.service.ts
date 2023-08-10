import {Injectable} from '@angular/core';
import {Gif, SearchResponse} from "../interface/gifs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, of, pipe, switchMap} from "rxjs";
import {Hero} from "../../heroes/interfaces/heroe.interfase";


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public hero: Hero[] = [];
  public gifsList: Gif[] = [];
  public apiKey: string = 'WlDaVPrwxx6GQ1iYJeUh77RIqv3Hxe07';
  private servicesUrl: string = 'https://api.giphy.com/v1/gifs';
  private _nameGifs : string;

  constructor(private Http: HttpClient) {
  }

  // getView = (heroe: string): Observable<Gif[]> => {
  //   const params = new HttpParams()
  //     .set('api_key', this.apiKey)
  //     .set('q',heroe)
  //     .set('limit', '1')
  //   console.log(heroe)
  //   return this.Http.get<SearchResponse>
  //   (`${this.servicesUrl}/search`, {params})
  //     .pipe(
  //       map((resp: SearchResponse) => {
  //         this.gifsList = resp.data;
  //         return resp.data;// Devuelve el arreglo de GIFs
  //       })
  //     );
  // }

  getView = (): Observable<Gif[]> => {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', this.nameGifs)
      .set('limit', '1')

    return this.Http.get<SearchResponse>
    (`${this.servicesUrl}/search`, {params})
      .pipe(
        map((resp: SearchResponse) => {
          this.gifsList = resp.data;
          return resp.data;// Devuelve el arreglo de GIFs
        })
      );
  }

  get nameGifs(): string {
    return this._nameGifs;
  }

  set nameGifs(value: string) {
    this._nameGifs = value;
  }
}
