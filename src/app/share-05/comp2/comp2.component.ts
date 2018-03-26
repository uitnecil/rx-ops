import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductModel } from '../product-model';
import { SharePublishService } from '../share-publish.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrls: ['./comp2.component.css']
})
export class Comp2Component implements OnInit, OnDestroy {

  obs1List: ProductModel[] = [];
  obsShareReplayList: ProductModel[] = [];
  obsPublishReplayList: ProductModel[] = [];

  public countdownSubscription: Observable<any>;
  public subscriptions: Subscription = new Subscription();
  public subscriptionDelay = 6;

  constructor(public sharePublishService: SharePublishService) {
    // subscribe after x seconds
    Observable.timer(this.subscriptionDelay * 1000)
      .subscribe(() => {
        const sub1 = this.sharePublishService.obs$.subscribe(list => this.obs1List = list);
        const sub2 = this.sharePublishService.obsShareReplay$.subscribe(list => this.obsShareReplayList = list);
        const sub3 = this.sharePublishService.obsPublishReplay$.subscribe(list => this.obsPublishReplayList = list);

        this.subscriptions.add(sub1);
        this.subscriptions.add(sub2);
        this.subscriptions.add(sub3);
      });

    // countdown
    this.countdownSubscription = Observable.interval(1000)
      .take(this.subscriptionDelay)
      .map(val => (val === this.subscriptionDelay - 1) ? 'SUBSCRIBED' : `Subscribing in ${this.subscriptionDelay - val - 1} seconds`);
    // .do(a => console.log(a));

    // TODO:
    // more details about the differences between the operators can be found in reactivex.io unit tests
    // shareReplay: http://reactivex.io/rxjs/test-file/spec-js/operators/shareReplay-spec.js.html
    // publishReplay: http://reactivex.io/rxjs/test-file/spec-js/operators/publishReplay-spec.js.html
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
