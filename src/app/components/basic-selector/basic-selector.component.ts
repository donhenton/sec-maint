import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-basic-selector',
  templateUrl: './basic-selector.component.html',
  styleUrls: ['./basic-selector.component.scss']
})
export class BasicSelectorComponent implements OnInit {

  @Input() listData;
  @Output() selectEvent: any = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  processSelect(selectedObj) {
     this.selectEvent.emit(selectedObj);
  }

}
