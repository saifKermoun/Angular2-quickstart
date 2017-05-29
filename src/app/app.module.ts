import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';



import { AppComponent }  from './app.component';
import { ApplicationComponent }  from './components/applications/application.component';

@NgModule({
  imports:      [ BrowserModule,  ReactiveFormsModule, FormsModule],
  declarations: [ AppComponent, ApplicationComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
