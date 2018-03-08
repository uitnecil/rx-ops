import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Observable} from 'rxjs/Observable';
import {DataModel} from '../data.model';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {
  public messages: Observable<DataModel[]>;

  constructor(private dataService: DataService) {
    this.messages = this.dataService.wsMessage$.scan((acc, v, i) => ([...acc, v]), [])
      .map((listOfElems: DataModel[]) => listOfElems.slice(-15));
      // .subscribe(elems => this.messages = elems);
  }

  ngOnInit() {
  }

}
