import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {
  public publishers = [
    {id: 'DC COMICS' },
    {id: 'MARVEL COMICS' }
  ];
}
