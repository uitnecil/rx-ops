import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DataGeneratorComponent} from './data-generator/data-generator.component';
import {SERVICE_INJ} from './data.service';
import {Component1Component} from './component1/component1.component';
import {MenuComponent} from './menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatTooltipModule} from '@angular/material';
import {Search04Component} from './search-04/search-04.component';
import {HomeComponent} from './home/home.component';
import {SEARCH04_INJECTABLE} from './search-04.service';
import { Create01Component } from './create-01/create-01.component';
import { Combining02Component } from './combining-02/combining-02.component';
import { Filtering06Component } from './filtering-06/filtering-06.component';
import { Merging03Component } from './merging-03/merging-03.component';


@NgModule({
  declarations: [
    AppComponent,
    DataGeneratorComponent,
    Component1Component,
    MenuComponent,
    Search04Component,
    HomeComponent,
    Create01Component,
    Combining02Component,
    Filtering06Component,
    Merging03Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [
    SERVICE_INJ,
    SEARCH04_INJECTABLE
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
