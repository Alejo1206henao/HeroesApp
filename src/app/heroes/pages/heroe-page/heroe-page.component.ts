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
        this.gifsService.nameGifs = this.hero.superhero;
        this.viewGifs();
        console.log({hero})
        return;
      })


  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list')
  }


  viewGifs() {
    if (this.hero) {
      this.gifsService.getView().subscribe(
        gifs => {
          this.gifsList = gifs
          console.log(this.hero?.superhero)
        }
      )
    }
  }


  // viewGifs() {
  //   if (this.hero) {
  //     this.gifsService.getView(this.hero.superhero).subscribe(
  //       gifs => {
  //         this.gifsList = gifs
  //         console.log(this.hero?.superhero)
  //       }
  //     )
  //   }
  // }

}
