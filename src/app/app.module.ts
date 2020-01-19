import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StarshipsComponent } from './starships/starships.component';
import { ItemDetailsComponent } from './shared/item-details/item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StarshipsComponent,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
