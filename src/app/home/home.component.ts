import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @HostBinding('class') margin = 'style-component';

  constructor() { }

  ngOnInit() {
  }

}
