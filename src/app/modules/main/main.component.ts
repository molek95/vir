import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  selectedRequestMethod: string;
  requestMethods: Array<string>;
  endpoint: string;
  isLoading: boolean;
  responseData: any;

  constructor() {
    this.selectedRequestMethod = 'GET';
    this.requestMethods = [
      'GET',
      'POST'
    ];
    this.endpoint = '';
    this.isLoading = false;
  }

  ngOnInit() {
  }

  sendRequest(): void {
    console.log('SEND REQUEST');
  }

}
