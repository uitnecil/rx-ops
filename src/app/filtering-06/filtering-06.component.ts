import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeLast';
import 'rxjs/add/operator/last';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/fromEvent';
import {MatButton} from '@angular/material';

@Component({
  selector: 'app-filtering-06',
  templateUrl: './filtering-06.component.html',
  styleUrls: ['./filtering-06.component.css']
})
export class Filtering06Component implements OnInit, AfterViewInit {
  @HostBinding('class') margin = 'style-component';

  @ViewChild('takeUntil') takeUntilButton: MatButton;
  @ViewChild('takeWhile') takeWhileButton: MatButton;


  private valueGenerator: Subject<number[]> = new Subject<number[]>();
  public source$: Observable<any>;
  public filter$: Observable<any>;
  public first$: Observable<any>;
  public take$: Observable<any>;
  public takeLast$: Observable<any>;
  public last$: Observable<any>;

  public takeUntil$: Observable<any>;
  public takeUntilTrigger$: Observable<any>;

  public takeWhile$: Observable<any>;
  public takeWhilePressed = true;


  public filterCompleted: boolean;
  public firstCompleted: boolean;
  public takeCompleted: boolean;
  public takeLastCompleted: boolean;
  public lastCompleted: boolean;
  public takeUntilCompleted: boolean;
  public takeWhileCompleted: boolean;


  public theArray: any[] = [];

  constructor() {
    // push every second a value down the stream
    this.source$ = this.valueGenerator
      .mergeMap((arr: number[]) => Observable.from(arr)
        .concatMap(arrayItem => Observable.timer(1000).map(() => arrayItem)));

    const evenNumbers = nr => nr % 2 === 0;
    this.filter$ = this.source$
      .filter(evenNumbers);
    // .filter((val: number) => evenNumbers(val));
    // .filter((val: number) => val % 2 === 0);

    this.first$ = this.source$
      .first();

    this.take$ = this.source$
      .take(3);

    this.takeLast$ = this.source$
      .takeLast(1);

    this.last$ = this.source$
      .last();

    this.takeWhile$ = this.source$
      .takeWhile(() => this.takeWhilePressed === true);
    // .takeWhile((val: number) => val > 4 && val < 6);



  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.takeUntilTrigger$ = Observable.fromEvent(this.takeUntilButton._elementRef.nativeElement, 'click');

    this.takeUntil$ = this.source$
      .takeUntil(this.takeUntilTrigger$);

    // switch a value based on a mouse button event
    Observable.fromEvent(this.takeWhileButton._elementRef.nativeElement, 'click')
      .subscribe(() => {
          this.takeWhilePressed = !this.takeWhilePressed;
          // console.log(`takeWhilePressed: `, this.takeWhilePressed);
        },
        // error
        console.log,
        // complete
        () => console.log(`takeWhileButton click Observable completed.`));

    // subscribe to all observables and log their values, errors and completion.
    this.logObs();
  }

  process(val: number) {
    this.valueGenerator.next(this.theArray = this.generateArray(val));
  }

  generateArray(length: number) {
    // just some sample values
    const tempLength = (length >= 5) && (length <= 50) ? length : 10;
    return Array.from({length: tempLength}, (v, i) => i + 1);
  }

  logObs() {
    this.filter$.subscribe(val => console.log(`first$: ${val}`), console.log, () => {
      console.log(`filter$ observable completed.`);
      this.filterCompleted = true;
    });
    this.first$.subscribe(val => console.log(`first$: ${val}`), console.log, () => {
      console.log(`first$ observable completed.`);
      this.firstCompleted = true;
    });
    this.take$.subscribe(val => console.log(`take$: ${val}`), console.log, () => {
      console.log(`take$ observable completed.`);
      this.takeCompleted = true;
    });
    this.takeLast$.subscribe(val => console.log(`takeLast$: ${val}`), console.log, () => {
      console.log(`takeLast$ observable completed.`);
      this.takeLastCompleted = true;
    });
    this.last$.subscribe(val => console.log(`last$: ${val}`), console.log, () => {
     console.log(`last$ observable completed.`);
     this.lastCompleted = true;
    });
    this.takeWhile$.subscribe(val => console.log(`takeWhile$: ${val}`), console.log, () => {
      console.log(`takeWhile$ observable completed.`);
      this.takeWhileCompleted = true;
    });
    this.takeUntil$.subscribe(val => console.log(`takeUntil$: ${val}`), console.log, () => {
      console.log(`takeUntil$ observable completed.`);
      this.takeUntilCompleted = true;
    });
  }
}
