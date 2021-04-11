import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    GuidedTourModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    GuidedTourService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
