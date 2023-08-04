import { Pipe, PipeTransform } from '@angular/core';
import {Hero} from "../interfaces/heroe.interfase";

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  //recibir un heroe y return con una URL
  transform(heroe: Hero): string {
    if (!heroe.id && !heroe.alt_img){
      return 'assets/no-image.png';
    }
    if (heroe.alt_img) return heroe.alt_img; //http://heroes
    return `assets/heroes/${heroe.id}.jpg`
  }
}
