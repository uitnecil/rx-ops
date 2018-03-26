import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/zip';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/race';
import 'rxjs/add/operator/race';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-combining-02',
  templateUrl: './combining-02.component.html',
  styleUrls: ['./combining-02.component.css']
})
export class Combining02Component implements OnInit, OnDestroy {

  private unsubscribeAll: Subscription = new Subscription();

  public stream1: Observable<any>;
  public stream2: Observable<any>;

  public stream1Tick: any[];
  public stream2Tick: any[];
  public streamsCombineLatestTick: any[];
  public streamsZipTick: any[];
  public streamsForkJoinTick: any[];
  public streamsRaceTick: any[];

  public dataStream1: any[];
  public dataStream2: any[];

  constructor() {

    this.stream1Tick = [];
    this.stream2Tick = [];
    this.streamsCombineLatestTick = [];
    this.streamsZipTick = [];
    this.streamsForkJoinTick = [];
    this.streamsRaceTick = [];

    this.dataStream1 = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-end'];
    this.dataStream2 = ['2-1', '2-2', '2-3', '2-4', '2-5', '2-end'];

    this.stream1 = Observable.from(this.dataStream1).concatMap(arrayValue => Observable.timer(1000).map(() => arrayValue));
    this.stream2 = Observable.from(this.dataStream2).concatMap(arrayValue => Observable.timer(3000).map(() => arrayValue));


    const sub1 = this.stream1.subscribe(elem => {
      console.log(`elem: ${elem}`);
      this.stream1Tick.push(elem);
    });

    const sub2 = this.stream2.subscribe(elem => {
      console.log(`elem: ${elem}`);
      this.stream2Tick.push(elem);
    });

    // instance method
    // const sub3 = this.stream1.combineLatest(this.stream2)
    //   .subscribe(elem => {
    //     console.log(`combineLatest: ${elem}`);
    //     this.streamsCombineLatestTick.push(elem);
    //   });

    // static method
    const sub3 = Observable.combineLatest(this.stream1, this.stream2)
      .subscribe(elem => {
        console.log(`combineLatest: ${elem}`);
        this.streamsCombineLatestTick.push(elem);
      });

    // instance method
    // const sub4 = this.stream1.zip(this.stream2)
    //   .subscribe(elem => {
    //     console.log(`Zip: ${elem}`);
    //     this.streamsZipTick.push(elem);
    //   });

    // static method
    const sub4 = Observable.zip(this.stream1, this.stream2)
      .subscribe(elem => {
        console.log(`Zip: ${elem}`);
        this.streamsZipTick.push(elem);
      });



    // static method -- no instance method available
    const sub5 = Observable.forkJoin(this.stream1, this.stream2)
      .subscribe(elem => {
        console.log(`forkJoin: ${elem}`);
        this.streamsForkJoinTick.push(elem);
      });


    const sub6 = this.stream1.race(this.stream2)
      .subscribe(elem => {
        console.log(`Race: ${elem}`);
        this.streamsRaceTick.push(elem);
      });

    this.unsubscribeAll.add(sub1);
    this.unsubscribeAll.add(sub2);
    this.unsubscribeAll.add(sub3);
    this.unsubscribeAll.add(sub4);
    this.unsubscribeAll.add(sub5);
    this.unsubscribeAll.add(sub6);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribeAll.unsubscribe();
  }
}
