import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataGeneratorComponent} from './data-generator/data-generator.component';
import {Search04Component} from './search-04/search-04.component';
import {HomeComponent} from './home/home.component';
import {Create01Component} from './create-01/create-01.component';
import {Combining02Component} from './combining-02/combining-02.component';
import {Filtering06Component} from './filtering-06/filtering-06.component';
import {Merging03Component} from './merging-03/merging-03.component';
import { Other07Component } from './other-07/other-07.component';
import { ComponentContainerComponent } from './share-05/component-container/component-container.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'create-01', component: Create01Component},
  {path: 'combining-02', component: Combining02Component},
  {path: 'merging-03', component: Merging03Component},
  {path: 'search-04', component: Search04Component},
  { path: 'share-05', component: ComponentContainerComponent },
  {path: 'filtering-06', component: Filtering06Component},
  { path: 'other-07', component: Other07Component },

  {path: 'data-generator', component: DataGeneratorComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
