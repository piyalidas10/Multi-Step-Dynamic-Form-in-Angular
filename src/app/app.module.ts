import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    AppComponent,
    TooltipDirective,
    TooltipComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [
    TooltipComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
