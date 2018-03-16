import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/zip';
import {MatButton} from '@angular/material';

@Component({
  selector: 'app-create-01',
  templateUrl: './create-01.component.html',
  styleUrls: ['./create-01.component.css']
})
export class Create01Component implements OnInit, AfterViewInit {
  // @HostBinding('class') margin = 'style-component';
  @ViewChild('fromEvent') fromEvent: MatButton;

  public theArray: any[] = [];

  public source$: Subject<any> = new Subject<any>();
  // public source$ = this.dataGenerator$.mergeMap((arr: any[]) => Observable.from(arr)
  //   .concatMap(arrayItem => Observable.timer(1000).map(() => arrayItem)));

  public obsOf: any[] = [];
  public obsOfSpread: any[] = [];
  public obsFrom: any[] = [];

  public obsOf$: Observable<any> = this.source$
    .concatMap((val: any[]) => Observable.of(val).concatMap(arrayItem => Observable.timer(1000).map(() => arrayItem)));

  public obsOfSpread$: Observable<any> = this.source$
    .concatMap((val: any[]) => Observable.of(...val).concatMap(arrayItem => Observable.timer(1000).map(() => arrayItem)));

  public obsFrom$: Observable<any> = this.source$
    .concatMap((val: any[]) =>  Observable.from(val).concatMap(arrayItem => Observable.timer(1000).map(() => arrayItem)));

  public obsCreated$: Observable<any>;
  public obsFromEvent$: Observable<any>;
  public obsInterval$: Observable<any>;
  public obsRange$: Observable<any>;
  public obsTimer$: Observable<any>;
  public obsThrow$: Observable<any>;

  constructor() {
    // const arr = ['as', 'dsd', 'fd', 'asd'];
    // Observable.of(arr).subscribe(x => console.log(`of(arr): ${x}`));
    // Observable.of(...arr).subscribe(x => console.log(`of(...arr): ${x}`));
    // Observable.from(arr).subscribe(x => console.log(`from(arr): ${x}`));
/*

    this.source$
    // .filter(x => x !== [])
      .concatMap((val: any[]) => Observable.of(val))
      .subscribe((x: any) => {
        this.obsOf.push(x);
        console.log(`Is array:`, x instanceof Array);
      });

    this.dataGenerator$
    // .filter(x => x !== [])
      .concatMap((val: any[]) => Observable.of(...val))
      .subscribe((x: any) => {
        this.obsOfSpread.push(x);
        console.log(`Is array:`, x instanceof Array);
      });

    this.source$
    // .filter(x => x !== [])
      .concatMap((val: any[]) => Observable.from(val))
      .subscribe((x: any) => {
        this.obsFrom.push(x);
        console.log(`Is array:`, x instanceof Array);
      });
*/

  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    // create infinite even numbers
    this.obsCreated$ = Observable.create(observer => {
      let val = 0;
      const interval = setInterval(() => {
          if (val % 2 === 0) {
            observer.next(val);
          }
          val++;
        }
        , 1000);
      return () => clearInterval(interval);
    });

    this.obsFromEvent$ = Observable.fromEvent(this.fromEvent._elementRef.nativeElement, 'click')
      .map(() => `Button clicked: ${new Date()}`);

    this.obsInterval$ = Observable.interval(2000);

    this.obsRange$ = Observable.range(25, 35)
      .concatMap((val) => Observable.timer(1000).map(() => val));
      // or using zip
      // .zip(Observable.interval(1000))
      // .map(([val, ]) => val);

    // this.obsRange$.subscribe(v => console.log(v));

    this.obsTimer$ = Observable.timer(5000, 1500);

    // this.obsThrow$ = Observable.throw(new Error('Custom Error')).zip(Observable.timer(5000), ([a, b]) => a);
    this.obsThrow$ = Observable.timer(5000).mergeMap(() => Observable.throw(new Error('Custom Error triggered with a delay of 5 seconds')));

  }

  process() {
    this.source$.next(this.theArray);
  }

  addToArray(value) {
    this.theArray.push(value);
  }

  isArray(val: any) {
    return (val instanceof Array);
  }
}
