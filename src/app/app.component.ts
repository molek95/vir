import { Component, OnInit, ViewChild } from '@angular/core';
import { MainComponent } from './modules/main/main.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  @ViewChild(MainComponent) mainParams: MainComponent;


  hasIndexedDB: boolean;
  indexedDB: any;
  openIndexedDBRequest: any;
  idbStore: any;
  requestHistory: any = [];


  constructor() {
    this.hasIndexedDB = false;
  }

  ngOnInit() {
    this.openIndexedDB();
  }

  loadRequestHandler(request: any) {
    this.mainParams.loadRequestHistory(request);
  }

  openIndexedDB() {
    if (window.indexedDB) {
      this.openIndexedDBRequest = window.indexedDB.open('saveRequests', 1);

      this.openIndexedDBRequest.onsuccess = (e: any) => {
        this.indexedDB = e.target.result;
        this.hasIndexedDB = true;

        this.fetchRequestHistory();
      };

      this.openIndexedDBRequest.onerror = (e: any) => {
        this.hasIndexedDB = false;
      };
    } else {
      this.hasIndexedDB = false;
    }

    this.openIndexedDBRequest.onupgradeneeded = (e: any) => {
      this.indexedDB = e.target.result;
      this.idbStore = this.indexedDB.createObjectStore('requestHistory', { keyPath: '_id', autoIncrement: true });
    };
  }

  fetchRequestHistory() {
    const transaction = this.indexedDB.transaction('requestHistory', 'readwrite');

    const requestHistoryStore = transaction.objectStore('requestHistory');
    requestHistoryStore.getAll().onsuccess = (e: any) => {
      this.requestHistory = e.target.result;
      console.log(this.requestHistory)
    };
  }

  clearRequestHistory() {
    const transaction = this.indexedDB.transaction('requestHistory', 'readwrite');

    const requestHistoryStore = transaction.objectStore('requestHistory');
    requestHistoryStore.clear().onsuccess = (e: any) => {
      this.requestHistory = [];
    };
  }
}
