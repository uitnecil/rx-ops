import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/retry';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-other-07-inputs',
  templateUrl: './other-07-inputs.component.html',
  styleUrls: ['./other-07-inputs.component.css']
})
export class Other07InputsComponent implements OnInit, AfterViewInit {
  // @ViewChildren(MatInput) inputs: QueryList<MatInput>;
  @ViewChild('filter1') filter1: ElementRef;
  @ViewChild('filter2') filter2: ElementRef;

  input1$: Observable<any>;
  input2$: Observable<any>;

  list: any[] = ['A11', 'A12', 'A13', 'A14', 'B11', 'B12', 'B13', 'B14', 'D11', 'D12', 'D13', 'D14', 'C11', 'C12', 'C13', 'C14',
    'defaultIfEmpty', 'startWith'];

  resultsInput1: any[] = [];
  resultsInput2: any[] = [];

  requestRetry: Observable<any>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.input1$ = Observable.fromEvent(this.filter1.nativeElement, 'keyup');
    this.input2$ = Observable.fromEvent(this.filter2.nativeElement, 'keyup');

    const sub1 = this.input1$
      .debounceTime(1000)
      .pluck('target', 'value')
      .distinctUntilChanged()
      .map(this.makeUpperCase)
      .do(console.log)
      .subscribe(this.filterResultsInput1,
        console.log);

    const sub2 = this.input2$
      .throttleTime(1000)
      .pluck('target', 'value')
      .distinctUntilChanged()
      .map(this.makeUpperCase)
      .do(val => console.log(`---> [${val}]`))
      .subscribe(this.filterResultsInput2,
        console.log);


  }


  filterResultsInput1(filterBy: string) {
    return this.resultsInput1 = this.list.filter((eachV: string) => eachV.toUpperCase().startsWith(filterBy));
  }

  filterResultsInput2(filterBy: string) {
    this.resultsInput2 = this.list.filter((eachV: string) => eachV.toUpperCase().startsWith(filterBy));
  }

  makeUpperCase = (val: string) => val.toUpperCase();

}
