import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-other-07',
  templateUrl: './other-07.component.html',
  styleUrls: ['./other-07.component.css']
})
export class Other07Component implements OnInit, OnDestroy {
  public unsubscribeAll: Subscription = new Subscription();

  public stream1: Observable<any>;
  public stream2: Observable<any>;
  public stream1Scan: Observable<any>;

  public stream1Tick: any[];
  public stream2Tick: any[];
  public stream1ScanTick: any[];

  public dataStream1: any[];
  public dataStream2: any[];

  constructor() {
    this.stream1Tick = [];
    this.stream2Tick = [];
    this.stream1ScanTick = [];


    this.dataStream1 = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-end'];
    this.dataStream2 = ['2-1', '2-2', '2-3', '2-4', '2-5', '2-end'];

    this.stream1 = Observable.from(this.dataStream1).concatMap(arrayValue => Observable.timer(1000).map(() => arrayValue));
    this.stream2 = Observable.from(this.dataStream2).concatMap(arrayValue => Observable.timer(1000).map(() => arrayValue));

    this.stream1Scan = this.stream1.scan((acc, curVal) => [...acc, curVal], []);

    const sub1 = this.stream1.subscribe(elem => {
      console.log(`stream1: ${elem}`);
      this.stream1Tick.push(elem);
    });

    const sub2 = this.stream2.subscribe(elem => {
      console.log(`stream2: ${elem}`);
      this.stream2Tick.push(elem);
    });

    const sub3 = this.stream1Scan
      .do((val) => console.log(`.do() e.g.: array length`, val.length))
      .subscribe(elems => {
        console.log(`stream1 scan: ${elems}`);
        this.stream1ScanTick.push(elems);
      });


    // add all subscriptions to a parent subscription for un-subscribing in 1 line.
    this.unsubscribeAll.add(sub1);
    this.unsubscribeAll.add(sub2);
    this.unsubscribeAll.add(sub3);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll.unsubscribe();
  }

}
