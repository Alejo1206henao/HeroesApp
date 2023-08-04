import {Injectable} from '@angular/core';
import {Gif, SearchResponse} from "../interface/gifs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {Hero} from "../../heroes/interfaces/heroe.interfase";
import {HeroresService} from "../../heroes/services/herores.service";

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    public hero: Hero[] = [];
    public gifsList: Gif[] = [];
    public apiKey: string = 'WlDaVPrwxx6GQ1iYJeUh77RIqv3Hxe07';
    private servicesUrl: string = 'https://api.giphy.com/v1/gifs';

    constructor(private HttpClient: HttpClient,
                private heroServices: HeroresService) {
    }

    // getNameId(): string[] {
    //     const nameId : string[] = this.hero.map((hero:Hero)
    //         => {
    //         hero.superhero.toString())
    //
    //         return nameId;
    // }

    public nameId : string = '';





    getView = (): Observable<Gif[]> => {
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', this.nameId)
            .set('limit', '1')

        return this.HttpClient.get<SearchResponse>
        (`${this.servicesUrl}/search`, {params})
            .pipe(
                map((resp: SearchResponse) => {
                    this.gifsList = resp.data;
                    return resp.data;// Devuelve el arreglo de GIFs
                })
            );
    }
}
