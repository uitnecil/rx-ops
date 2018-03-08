import { Component } from '@angular/core';
import {DataModel} from './data.model';
import {Observable} from 'rxjs/Observable';
import {DataService} from './data.service';
import {genRandomData} from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService: DataService) {

    // every 5 seconds push an entity to the echo WS server
    Observable.interval(1000)
      .map(() => {
        const randomEntity = genRandomData();
        this.dataService.addMessage(randomEntity);
        return randomEntity;
      })
      .subscribe(
        // (v: DataModel) => console.log(`Pushed ${v.name} to WS`),
        null,
        console.log,
        () => console.log(`Done`));
  }


}
