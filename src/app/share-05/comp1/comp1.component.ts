import { Component, OnInit } from '@angular/core';
import { SharePublishService } from '../share-publish.service';
import { ProductModel } from '../product-model';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {
  public productsList: ProductModel[];

  constructor(public sharePublishService: SharePublishService) {
    this.sharePublishService.obs$.subscribe(list => this.productsList = list);
  }

  ngOnInit() {
  }

}
