import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-create-01',
  templateUrl: './create-01.component.html',
  styleUrls: ['./create-01.component.css']
})
export class Create01Component implements OnInit {
  @HostBinding('class') margin = 'style-component';

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
