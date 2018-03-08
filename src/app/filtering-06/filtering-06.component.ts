import {Component, HostBinding, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-filtering-06',
  templateUrl: './filtering-06.component.html',
  styleUrls: ['./filtering-06.component.css']
})
export class Filtering06Component implements OnInit {
  @HostBinding('class') margin = 'style-component';
  private valueGenerator: Subject<number[]> = new Subject<number[]>();
  public source$: Observable<any>;
  public filter$: Observable<any>;
  public first$: Observable<any>;
  public take$: Observable<any>;
  public last$: Observable<any>;
  public takeUntil$: Observable<any>;
  public takeWhile$: Observable<any>;

  public theArray: any[] = [];
  constructor() {
    this.source$ = this.valueGenerator
      .map((val) => Observable.from(val));
  }

  ngOnInit() {
    this.filter$ = this.valueGenerator
      .filter((val: number) => val < 4);
  }

  process(val: number) {
    this.valueGenerator.next(this.theArray = this.generateArray(val));
  }

  generateArray(length: number) {
    // just some sample values
    const tempLength = (length > 5) && (length < 50) ? length : 10;
    return Array.from({length: tempLength }, (v, i) => i + 1);
  }
}
