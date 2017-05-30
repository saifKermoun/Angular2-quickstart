import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { ApplicationComponent }  from './components/applications/application.component';
import { FilterPipe } from './components/applications/filter.pipe'

@NgModule({
  imports:      [ BrowserModule,  ReactiveFormsModule, FormsModule],
  declarations: [ AppComponent, ApplicationComponent, FilterPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
