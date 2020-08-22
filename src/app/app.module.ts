import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MultistepformComponent } from './multistepform/multistepform.component';
import { FormComponent } from './shared/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    MultistepformComponent,
    FormComponent,
    ResultComponent
  ],
  providers: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
