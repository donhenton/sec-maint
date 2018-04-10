import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { EditState, UsersUpdate, AppsUpdate, SelectorData } from './../basic-selector/basic.interfaces';

@Component({
  selector: 'app-basic-selector',
  templateUrl: './basic-selector.component.html',
  styleUrls: ['./basic-selector.component.scss']
})
export class BasicSelectorComponent implements OnInit {

  @Input() listData: SelectorData[];
  @Input() editState: EditState = EditState.INITIAL;
  @Output() selectEvent: any = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  processSelect(selectedObj) {
    this.selectEvent.emit({ type: EditState.EDIT, selected: selectedObj });
  }
  processDelete(selectedObj) {
    this.selectEvent.emit({ type: EditState.DELETE, selected: selectedObj });
  }

  updateDisplayItem(d: SelectorData) {

    this.listData = this.listData.map((v, idx) => {
      if (v.id === d.id) {
        return new SelectorData(d.name , v.id, v.ref);
      } else {
        return v;
      }

    });

  }

}
