import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroePageComponent } from './pages/heroe-page/heroe-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import {MaterialModule} from "../material/material.module";
import { ComponentsComponent } from './components/components.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {GifsComponent} from "../gifs/gifs/gifs.component";
import {GifsCardComponent} from "../gifs/gifs-card/gifs-card.component";



@NgModule({
  declarations: [
    HeroePageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    ComponentsComponent,
    GifsComponent,
    GifsCardComponent,
    //Pipes
    HeroImagePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    MaterialModule,
  ]
})
export class HeroesModule { }
