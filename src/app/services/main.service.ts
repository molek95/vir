import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private httpClient: HttpClient) { }

  sendGetRequest(url: string, headers: any) {
    console.log('GET REQUEST');
    headers = new HttpHeaders(headers);
    return this.httpClient.get(url, { headers });
  }

  sendPostRequest(url: string, requestBody: any, headers: any) {
    console.log('POST REQUEST');
    headers = new HttpHeaders(headers);
    console.log(requestBody);
    return this.httpClient.post(url, requestBody, { headers });
  }

  sendPutRequest(url: string, requestBody: any, headers: any) {
    console.log('PUT REQUEST');
    headers = new HttpHeaders(headers);
    return this.httpClient.put(url, requestBody, { headers })
  }
}
