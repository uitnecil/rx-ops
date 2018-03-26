import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductModel } from '../product-model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { SharePublishService } from '../share-publish.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.css']
})
export class Comp3Component implements OnInit, OnDestroy {

  obs1List: ProductModel[] = [];
  obsShareReplayList: ProductModel[] = [];
  obsPublishReplayList: ProductModel[] = [];

  public countdownSubscription: Observable<any>;

  public subscriptions: Subscription = new Subscription();

  public subscriptionDelay = 21;

  constructor(public sharePublishService: SharePublishService) {
    // subscribe after 11 seconds
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
    // more details about the differences between the operators can be found in reactive.io unit tests
    // shareReplay: http://reactivex.io/rxjs/test-file/spec-js/operators/shareReplay-spec.js.html
    // publishReplay: http://reactivex.io/rxjs/test-file/spec-js/operators/publishReplay-spec.js.html
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
