import {Component, Input, OnInit} from '@angular/core';
import {GifsService} from "../services/gifs.service";
import {Hero} from "../../heroes/interfaces/heroe.interfase";
import {Gif} from "../interface/gifs";



@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent {
  constructor(private gifsService:GifsService) {
  }


}
