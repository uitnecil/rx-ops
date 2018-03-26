import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concat';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-merging-03',
  templateUrl: './merging-03.component.html',
  styleUrls: ['./merging-03.component.css']
})
export class Merging03Component implements OnInit, OnDestroy {
  public stream1: Observable<any>;
  public stream2: Observable<any>;

  public stream1Tick: any[];
  public stream2Tick: any[];
  public streamsMergeTick: any[];
  public streamsConcatTick: any[];
  public streamMapTick: any[];

  private subs: Subscription = new Subscription();

  public dataStream1: any[];
  public dataStream2: any[];

  constructor() {

    this.stream1Tick = [];
    this.stream2Tick = [];
    this.streamsMergeTick = [];
    this.streamsConcatTick = [];
    this.streamMapTick = [];

    this.dataStream1 = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-end'];
    this.dataStream2 = ['2-1', '2-2', '2-3', '2-4', '2-5', '2-end'];

    this.stream1 = Observable.from(this.dataStream1).concatMap(arrayValue => Observable.timer(1000).map(() => arrayValue));
    this.stream2 = Observable.from(this.dataStream2).concatMap(arrayValue => Observable.timer(1000).map(() => arrayValue));


    const sub1 = this.stream1.subscribe(elem => {
      console.log(`elem: ${elem}`);
      this.stream1Tick.push(elem);
    });

    const sub2 = this.stream2.subscribe(elem => {
      console.log(`elem: ${elem}`);
      this.stream2Tick.push(elem);
    });

    const sub3 = this.stream1.merge(this.stream2)
      .subscribe(elem => {
        console.log(`Merged: ${elem}`);
        this.streamsMergeTick.push(elem);
      });

    const sub4 = this.stream1.concat(this.stream2)
      .subscribe(elem => {
        console.log(`Concatenated: ${elem}`);
        this.streamsConcatTick.push(elem);
      });

    const link = 'http://getid.com/?id=';
    const sub5 = this.stream1.map(x => link + x)
      .subscribe(linkString => {
        console.log(`Mapped link: ${linkString}`);
        this.streamMapTick.push(linkString);
      });

    // add all subscriptions to a parent subscription for automatic un-subscription when the parent is un-subscribed.
    this.subs.add(sub1);
    this.subs.add(sub2);
    this.subs.add(sub3);
    this.subs.add(sub4);
    this.subs.add(sub5);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
