import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataGeneratorComponent} from './data-generator/data-generator.component';
import {Search04Component} from './search-04/search-04.component';
import {HomeComponent} from './home/home.component';
import {Create01Component} from './create-01/create-01.component';
import {Combining02Component} from './combining-02/combining-02.component';
import {Filtering06Component} from './filtering-06/filtering-06.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'create-01', component: Create01Component},
  {path: 'combining-02', component: Combining02Component},
  {path: 'search-04', component: Search04Component},
  {path: 'filtering-06', component: Filtering06Component},

  {path: 'data-generator', component: DataGeneratorComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
