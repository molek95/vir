import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

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
  responseError: string;
  endpointError: string;
  
  requestBody: any;
  requestBodyDataTypes: any;
  dataTypes: any;

  constructor(private mainService: MainService) {
    this.selectedRequestMethod = 'GET';
    this.requestMethods = [
      'GET',
      'POST'
    ];
    this.endpoint = '';
    this.responseError = '';
    this.isLoading = false;
    this.dataTypes = [
      'Number',
      'Boolean',
      'String'
    ];
    this.requestBody = [{key: '', value: ''}];
    this.requestBodyDataTypes = [''];
  }

  ngOnInit() { }

  private validateEndpoint(url: string) {
    // tslint:disable-next-line: max-line-length
    const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return urlRegExp.test(url);
  }

  addItem() {
    this.requestBody.push({key: '', value: ''});
    this.requestBodyDataTypes.push('');
  }

  removeItem(i: number) {
    this.requestBody.splice(i, 1);
  }

  isAddDisabled() {
    if (this.requestBody.length > 0) {
      if (this.requestBody[this.requestBody.length - 1].key === '' || this.requestBody[this.requestBody.length -1]. value === '') {
        return true;
      }
    }
    return false;
  }

  sendRequest(): void {
    this.endpointError = '';
    this.responseError = '';
    this.responseData = '';

    if (!this.endpoint) {
      this.endpointError = 'Endpoint is required!';
      return;
    }

    if (!this.validateEndpoint(this.endpoint)) {
      this.endpointError = 'Enter a valid URL!';
      return;
    }

    this.isLoading = true;

    switch (this.selectedRequestMethod) {
      case 'GET': {
        this.mainService.sendGetRequest(this.endpoint).subscribe(res => {
          this.isLoading = false;
          this.responseData = JSON.stringify(res, undefined, 4);
        },
        error => {
          this.isLoading = false;
          this.responseError = JSON.stringify(error, undefined, 4);
        });
        break;
      }
      case 'POST': {
        this.mainService.sendPostRequest(this.endpoint).subscribe(res => {
          this.isLoading = false;
          this.responseData = JSON.stringify(res, undefined, 4);
        },
        error => {
          this.isLoading = false;
          console.log(error);
          this.responseError = JSON.stringify(error, undefined, 4);
        });
        break;
      }
    }

    this.selectedRequestMethod = '';
    this.endpoint = '';
    this.endpointError = '';
  }

}
