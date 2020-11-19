import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent implements OnInit {
  @Input() requestHistory: any;
  @Output() loadRequest = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  load(req: any) {
    this.loadRequest.emit(req);
  }

}
