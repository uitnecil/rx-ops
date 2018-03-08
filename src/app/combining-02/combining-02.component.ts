import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-combining-02',
  templateUrl: './combining-02.component.html',
  styleUrls: ['./combining-02.component.css']
})
export class Combining02Component implements OnInit {
  @HostBinding('class') margin = 'style-component';

  constructor() { }

  ngOnInit() {
  }

}
