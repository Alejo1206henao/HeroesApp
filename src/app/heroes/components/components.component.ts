import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../interfaces/heroe.interfase";

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit{
  @Input()
  public hero!: Hero;

  //condicional de que si no existe me saque un error
  ngOnInit(): void {
    if(!this.hero) throw Error ('Hero property is required')
  }

};
