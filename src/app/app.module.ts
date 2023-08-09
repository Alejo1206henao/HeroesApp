import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from "./shared/shared.module";

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NewPageComponent} from "./heroes/pages/new-page/new-page.component";
import {GifsService} from "./gifs/services/gifs.service";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    SharedModule,
  ],
  providers: [
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
