import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  @Input() indexedDB: any;
  @Input() openIndexedDBRequest: any;
  @Output() newRequest = new EventEmitter();

  selectedRequestMethod: string;
  requestMethods: Array<string>;
  endpoint: string;

  isLoading: boolean;

  responseData: any;
  responseError: string;
  endpointError: string;

  requestBody: any;
  requestBodyDataTypes: any;
  requestHeaders: any;
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
    this.requestHeaders = [{key: 'Content-Type', value: 'application/json'}];
  }

  ngOnInit() { }

  private validateEndpoint(url: string) {
    // tslint:disable-next-line: max-line-length
    const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return urlRegExp.test(url);
  }

  addItem(ctx: string) {
    let context;

    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
    }

    context.push({key: '', value: ''});
    if (ctx === 'Body') {
      this.requestBodyDataTypes.push('');
    }
  }

  removeItem(i: number, ctx: string) {
    let context;

    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
    }

    context.splice(i, 1);
  }

  isAddDisabled(ctx: string) {
    let context;

    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
    }

    if (context.length > 0) {
      if (context[context.length - 1].key === '' || context[context.length -1]. value === '') {
        return true;
      }
    }
    return false;
  }

  constructObject(ctx: string) {
    let context;
    if (ctx === 'Body') {
      context = this.requestBody;
    } else if (ctx === 'Headers') {
      context = this.requestHeaders;
    }

    let constructedObject = {};
    constructedObject = context.reduce((object, item) => {
      object[item.key] = item.value;
      return object;
    }, {});
    return constructedObject;
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
        this.mainService.sendGetRequest(this.endpoint, this.constructObject('Headers')).subscribe(res => {
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
        this.mainService.sendPostRequest(this.endpoint, this.constructObject('Body'), this.constructObject('Headers')).subscribe(res => {
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

    this.saveRequest(this.selectedRequestMethod);
    this.newRequest.emit();

    this.selectedRequestMethod = 'GET';
    this.endpoint = '';
    this.endpointError = '';
    this.requestBody = [{key: '', value: ''}];
    this.requestBody = [''];
    this.requestHeaders = [{key: 'Content-Type', value: 'application/json'}];
  }

  saveRequest(requestType: string) {
    const requestObject = {
      endpoint: this.endpoint,
      method: this.selectedRequestMethod,
      headers: this.constructObject('Headers')
    };
    if (requestType === 'POST') {
      requestObject['body'] = this.constructObject('Body');
    }
    const transaction = this.indexedDB.transaction('requestHistory', 'readwrite');

    const requestHistoryStore = transaction.objectStore('requestHistory');
    requestHistoryStore.add(requestObject);
  }


  loadRequestHistory(request: any) {
    this.selectedRequestMethod = request.method;
    this.endpoint = request.endpoint;
    this.requestHeaders = this.deconstructObject(request.headers, 'Headers');
    if (request.method === 'POST') {
      this.requestBody = this.deconstructObject(request.body, 'Body');
    }
  }

  deconstructObject(object: any, type: string) {
    const objectArray = [];
    switch (type) {
      case 'Body': {
        Object.keys(object).forEach((objKey, index) => {
          this.requestBodyDataTypes[index] = 'String';
          const obj = { key: objKey, value: '' };
          objectArray.push(obj);
        });
        break;
      }
      case 'Headers': {
        Object.keys(object).forEach(objKey => {
          const obj = { key: objKey, value: object[objKey] };
          objectArray.push(obj);
        });
        break;
      }
    }
    return objectArray;
  }

}
