import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProductModel } from './product-model';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/interval';

import { getRandomString } from '../utils';


@Injectable()
export class SharePublishService implements OnDestroy {

  public source$: Subject<ProductModel> = new Subject<ProductModel>();
  public obs$: Observable<ProductModel[]>;
  public obsShareReplay$: Observable<ProductModel[]>;
  public obsPublishReplay$: Observable<ProductModel[]>;

  public subscriptions: Subscription = new Subscription();

  constructor() {
    this.obs$ = this.source$
      .scan((acc, val) => [...acc, val], [])

      // keep only last 10 values to be easier to view in template
      .map(arr => arr.slice(-10));

    this.obsShareReplay$ = this.obs$.shareReplay(1);
    this.obsPublishReplay$ = this.obs$.publishReplay(1).refCount().startWith([]);

    // make it rain
    const sub1 = Observable.interval(2000)
      .map((idx) => new ProductModel(idx, getRandomString(), getRandomString()))
      // .do(prod => console.log(`Created Prod: `, prod))
      .subscribe(this.source$);

    this.subscriptions.add(sub1);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
