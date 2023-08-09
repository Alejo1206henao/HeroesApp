import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Hero} from "../../interfaces/heroe.interfase";
import {HeroresService} from "../../services/herores.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  public heroes: Hero[] = [];
  public selectedHero?: Hero;
  // it's an input form reactive
  public searchInput = new FormControl('');

  constructor(private heroService: HeroresService) {
  }


  searchHero() {
    //TS2322: Type  string | null  is not assignable to type  string 
    // El tipo de la constante puede ser null
    const value: string = this.searchInput.value || '';

    this.heroService.getSuggestions(value)
      .subscribe(heroes => this.heroes = heroes);
  }

  //MatAutocompleteSelectedEvent: nos el valor del objeto junto con Event.option.value
  onSelectedOption(event: MatAutocompleteSelectedEvent):void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    //para validar lo que la persona está escribiendo
    //setValue = trae el valor seleccionado en el SearchInput
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }


}
