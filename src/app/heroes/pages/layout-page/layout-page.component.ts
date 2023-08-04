import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Listado', icon: 'filter_list', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-heroe' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]
}
