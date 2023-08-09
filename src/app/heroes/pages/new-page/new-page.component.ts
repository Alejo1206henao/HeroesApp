import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

import {filter, switchMap, tap} from "rxjs";

import {Hero, Publisher} from "../../interfaces/heroe.interfase";
import {HeroresService} from "../../services/herores.service";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  // los FormGroup son de tipo generico el cual le especifico el tipo de dato que va dentro de el
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl<string>('', {nonNullable: true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    {id: 'DC COMICS', desc: 'DC COMICS'},
    {id: 'MARVEL COMICS', desc: 'MARVEL COMICS'}
  ];

  onSubmit(): void {
    if (this.heroForm.invalid) return;

    if (this.CurrentHero.id) {
      this.heroesServices.updateHero(this.CurrentHero).subscribe(
        hero => {
          this.showSnackBar(`${hero.superhero} update!`)
        });
      return;
    }

    this.heroesServices.addHero(this.CurrentHero).subscribe(
      hero => {
        this.router.navigate(['/heroes/edit', hero.id])
        this.showSnackBar(`${hero.superhero} update!`)
      });
  }

  onDeleteConfirm() {
    if (!this.CurrentHero.id) throw Error('Heroe no seleccionado');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: this.heroForm.value},
    });

    dialogRef.afterClosed().pipe(
      //Filter => ya sabemos que la persona confirmo que si quiere eliminarlo
      filter( (result:boolean) => result === true),
      tap(result => console.log(result)),
      //aca disparamos el observable de eliminacion
      switchMap( () =>this.heroesServices.deleteHero(this.CurrentHero.id)),
      filter(wasDelited => wasDelited ),
    ).subscribe(result => {
      this.router.navigate(['/heroes/list'])
    });



    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) return;
    //   this.heroesServices.deleteHero(this.CurrentHero.id).subscribe(
    //     wasResult => {
    //       if (wasResult)
    //         this.router.navigate(['/heroes/list'])
    //     })
    // });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'done', {duration: 2500})
  }

  constructor(private heroesServices: HeroresService,
              private router: Router,
              private activadedRouter: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  get CurrentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
    console.log(hero)
  }

  //con estos metodos estoy cargando la data que viene por la URL
  ngOnInit(): void {
    //diferente de la Url cuando quiera mostrar o editar en este caso
    //es editar (si no incluye 'edit' no me haga nada
    if (!this.router.url.includes('edit')) return;

    this.activadedRouter.params.pipe(
      switchMap(({id}) =>
        this.heroesServices.getHeroeById(id)),
    ).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/');
      this.heroForm.reset(hero);
      return;

    });
  }
}

