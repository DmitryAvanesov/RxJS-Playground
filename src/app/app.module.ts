import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlphabetInvasionGameComponent } from './alphabet-invasion-game/alphabet-invasion-game.component';

@NgModule({
  declarations: [
    AppComponent,
    AlphabetInvasionGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
