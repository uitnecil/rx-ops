import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comp1Component } from './comp1/comp1.component';
import { Comp2Component } from './comp2/comp2.component';
import { Comp3Component } from './comp3/comp3.component';
import { ComponentContainerComponent } from './component-container/component-container.component';
import { SharePublishService } from './share-publish.service';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [Comp1Component, Comp2Component, Comp3Component, ComponentContainerComponent],
  exports: [ComponentContainerComponent],
  providers: [SharePublishService]
})
export class Share05Module {
}
