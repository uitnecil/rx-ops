import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsArrayPipe } from './is-array.pipe';
import { MatButtonModule, MatSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule
  ],
  declarations: [IsArrayPipe],
  exports: [IsArrayPipe, MatSidenavModule, MatButtonModule]
})
export class SharedModule {
}
