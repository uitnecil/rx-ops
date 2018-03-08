import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {DataModel} from '../data.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-data-generator',
  templateUrl: './data-generator.component.html',
  styleUrls: ['./data-generator.component.css']
})
export class DataGeneratorComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
