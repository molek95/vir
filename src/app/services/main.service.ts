import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private httpClient: HttpClient) { }

  sendGetRequest(url: string) {
    console.log('GET REQUEST');
    return this.httpClient.get(url);
  }

  sendPostRequest(url: string, requestBody: any) {
    console.log('POST REQUEST');
    return this.httpClient.post(url, requestBody);
  }
}
