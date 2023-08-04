import {Component, ElementRef, OnInit} from '@angular/core';
import {HeroresService} from "../../services/herores.service";
import {ActivatedRoute, Router} from "@angular/router";
import {delay, Observable, switchMap} from "rxjs";
import {Hero} from "../../interfaces/heroe.interfase";
import {GifsService} from "../../../gifs/services/gifs.service";
import {Gif} from "../../../gifs/interface/gifs";

@Component({
    selector: 'app-heroe-page',
    templateUrl: './heroe-page.component.html',
    styleUrls: ['./heroe-page.component.css'],
})
export class HeroePageComponent implements OnInit {
    public hero?: Hero;
    gifsList: Gif[] = []

    constructor(private heroesService: HeroresService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private gifsService: GifsService
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                delay(500),
                switchMap(({id}) => this.heroesService.getHeroeById(id)),
            )
            .subscribe(hero => {
                if (!hero) return this.router.navigate(['/heroes/list']);

                this.hero = hero;
                console.log({hero})
                return;
            })

        this.viewGifs();

    }

    goBack(): void {
        this.router.navigateByUrl('/heroes/list')
    }

    nameId():string{
         this.hero?.id
        return this.nameId();
         console.log(this.nameId())
    }

    viewGifs() {
        this.gifsService.getView().subscribe(
            gifs => {
                this.gifsList = gifs
            }
        )
    }

}
