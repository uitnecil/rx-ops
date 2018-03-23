import {Injectable, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataModel} from './data.model';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';
import {Subscription} from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DataService implements OnDestroy {
  // public source1$: Observable<DataModel>;
  public subscriptions: Subscription = new Subscription();

  private socket = new WebSocket('ws://echo.websocket.org');

  public wsOpen$ = Observable.fromEvent(this.socket, 'open');
  // public wsOpenSub$ = this.wsOpen$.subscribe(this.onMessage);
  public wsMessage$ = Observable.fromEvent(this.socket, 'message')
    .pluck('data')
    .do(console.log)
    .map((res: string) => JSON.parse(res));
  public wsError$ = Observable.fromEvent(this.socket, 'error').subscribe(this.onError);
  public wsClose$ = Observable.fromEvent(this.socket, 'close').subscribe(this.onClose);

  private outgoingMessage: Subject<DataModel> = new Subject<DataModel>();


  constructor() {
    // this.socket.onopen = this.onOpen;
    // this.socket.onmessage = this.onMessage;
    // this.socket.onerror = this.onError;
    // this.socket.onclose = this.onClose;


    // add subscriptions to list to be un-subscribed after use
    // this.subscriptions.add(this.wsMessage$);
    this.subscriptions.add(this.wsError$);
    this.subscriptions.add(this.wsClose$);

    // this does the actual message sending
    this.sendMessagesAsAvailable();

  }


  // onOpen(evt): void {
  //   console.log(`WS connected`, evt);
  // }

  onError(evt): void {
    console.log(evt);
  }

  onClose(evt): void {
    console.log(`WS Closed`, evt);
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
    this.subscriptions.unsubscribe();
  }

  // onMessage(evt: any): void {
  //   console.log(`Received: `, evt);
  // }

  addMessage(msg: DataModel): void {
    this.outgoingMessage.next(msg);
  }

  sendMessagesAsAvailable(): void {
    const combineThem = (ev, msg) => {
      return [ev, JSON.stringify(msg)];
    };
    const combined$ = this.wsOpen$.combineLatest(this.outgoingMessage, combineThem)
      .subscribe(([ev, msg]) => {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
          this.socket.send(msg);
          // console.log(`Sent`, msg);
        }
      });

    // add subscription to the unsubscribe list
    this.subscriptions.add(combined$);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

export const SERVICE_INJ: any[] = [
  DataService
];
