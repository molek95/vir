import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  selectedRequestMethod: string;
  requestMethods: Array<string>;

  constructor() {
    this.selectedRequestMethod = 'GET';
    this.requestMethods = [
      'GET',
      'POST'
    ];
  }

  ngOnInit() {
  }

}
