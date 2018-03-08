import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {ReplyModel} from './search-04/reply-model';

@Injectable()
export class Search04Service {
  // public receive$: Subject<any> = new Subject<any>();
  // public reply$: Observable<any>;

  private scheduledDelays: any[][] = [
    [1, 'answer 1'],
    [4, 'answer 2'],
    [2, 'answer 3'],
    [3, 'answer 4'],
    [6, 'answer 5'],
    [5, 'answer 6']
  ];

  constructor() {
    // this.reply$ = this.receive$
    // map each incoming string with an answer after a delayed reply with corresponding set up value from this.scheduledDelays
    //   .mergeMap((val: string) => Observable.timer((this.scheduledDelays[val.length][0] % 6) * 1000)
    //     .map(() => new ReplyModel(val, this.scheduledDelays[val.length][0], this.scheduledDelays[val.length][1]))
    //   );
  }


}

export const SEARCH04_INJECTABLE: any[] = [ Search04Service ];
