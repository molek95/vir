import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  hasIndexedDB: boolean;
  indexedDB: any;
  openIndexedDBRequest: any;
  idbStore: any;
  requestHistory: any;


  constructor() {
    this.hasIndexedDB = false;
  }

  ngOnInit() {
    this.openIndexedDB();
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
