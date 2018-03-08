import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Search04Service} from '../search-04.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/filter';
import {ReplyModel} from './reply-model';

@Component({
  selector: 'app-search-04',
  templateUrl: './search-04.component.html',
  styleUrls: ['./search-04.component.css']
})
export class Search04Component implements OnInit, AfterViewInit {
  @HostBinding('class') margin = 'style-component';
  @ViewChild('input1') private input1: ElementRef;
  public onInput1$: Observable<any>;
  public onInput2$: Observable<any>;
  public onInput3$: Observable<any>;

  private scheduledDelays: number[] = [0, 1, 4, 2, 3, 6, 5];

  // public hintMergeMap = '(1) - mergeMap emits items into the resulting Observable just as they are emitted from inner Observables. ' +
  //   'It doesn’t wait for anything.' +
  //   '( 2 ) - mergeMap doesn’t preserve the order from outer Observable. Collections of results may interleave based on
  // response timings.' +
  //   '( 3 ) - mergeMap doesn’t cancel any inner Observables. All values from inner Observables will get to the final collection.'

  constructor(private searchService: Search04Service) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const source$ = Observable.fromEvent(this.input1.nativeElement, 'keyup')
    //   .do(console.log)
      .debounceTime(100)
      .pluck('target', 'value')
      // .distinctUntilChanged()
      .filter((str: string) => str.length !== 0);

    const acumulatorFunction = (acc, value) => [...acc, value];

    this.onInput1$ = source$
    .mergeMap((src: string) => this.simulateDelay(src))
      // .mergeMap(this.simulateDelay)
      .scan((acc, v) => [...acc, v], [])
      // .scan(acumulatorFunction, [])
      // limit the number of results to maximum 20
      .map(arr => arr.slice(-20));

    this.onInput2$ = source$
      .do(src => console.log(`Input 2: ${src}`))
      .concatMap((src: string) => this.simulateDelay(src))
      // .concatMap(this.simulateDelay)
      .scan((acc, v) => [...acc, v], [])
      // .scan(acumulatorFunction, [])
      // limit the number of results to maximum 20
      .map(arr => arr.slice(-20));

    this.onInput3$ = source$
      .do(src => console.log(`Input 3: ${src}`))
      .switchMap((src: string) => this.simulateDelay(src))
      // .switchMap(this.simulateDelay)
      .scan((acc, v) => [...acc, v], [])
      // .scan(acumulatorFunction, [])
      // limit the number of results to maximum 20
      .map(arr => arr.slice(-20));

  }

  simulateDelay(val): Observable<ReplyModel> {
    return Observable.of(val)
      .mergeMap((el: string) => {
          // console.log(this.scheduledDelays);
          const secondsDelay = this.scheduledDelays[el.length % 6];
          return Observable.timer(secondsDelay * 1000)
            .map(() => new ReplyModel(el, secondsDelay));
        }
      );
  }
}
