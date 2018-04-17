import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ShuttleData, ShuttleStructure, GROUP_MEMBERSHIP } from './shuttle.interfaces';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { EditType } from '../basic-selector/basic.interfaces';

@Component({
  selector: 'app-item-shuttle',
  templateUrl: './item-shuttle.component.html',
  styleUrls: ['./item-shuttle.component.scss']
})
export class ItemShuttleComponent implements OnInit, OnChanges {


  constructor() { }

  @Input() shuttleItems: ShuttleStructure;
  @Input() maintType: EditType;
  @Input() shuttleMetaData: any = {assignedTo: '<assignedTo>'};
  @ViewChild('selectorInGroup') inGroupSelector: ItemSelectorComponent;
  @ViewChild('selectorNotInGroup') notInGroupSelector: ItemSelectorComponent;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.shuttleMetaData) {
     // console.log(changes.shuttleMetaData);

    }

  }

  /**
   *
   * @param type In or NotIn the group you check to see if it has any selections
   */
  computeShuttleButtonDisable(type) {
    let selectionCount = 0;
    if (!this.notInGroupSelector || !this.inGroupSelector) {
      return 'shuttle-button-inactive';
    }
    if (type === 'NotIn') {
      selectionCount = this.notInGroupSelector.getSelectedItems() ?  this.notInGroupSelector.getSelectedItems().length : 0;
    } else {
      selectionCount = this.inGroupSelector.getSelectedItems() ?  this.inGroupSelector.getSelectedItems().length : 0;
    }
    // console.log(`selectionCount ${selectionCount}`);
    if  (selectionCount === 0) {
      return 'shuttle-button-inactive';
    }
    return 'shuttle-button-active';
  }

  requestInToNotIn() {

    const selectedInGroupItems = this.inGroupSelector.getSelectedItems().map((p: ShuttleData)  => {
      const newP = new ShuttleData(p.name, p.id, p.ref, p.source);
      return newP;
    });
    this.notInGroupSelector.addItems(selectedInGroupItems);
    this.inGroupSelector.removeSelectedItems();
    this.inGroupSelector.clearSelection();

  }
  requestNotInToIn() {
    const selectedNotInGroupItems = this.notInGroupSelector.getSelectedItems().map(p => {
      const newP = new ShuttleData(p.name, p.id, p.ref, p.source);
      return newP;
    });
    this.inGroupSelector.addItems(selectedNotInGroupItems);
    this.notInGroupSelector.removeSelectedItems();
    this.notInGroupSelector.clearSelection();

  }

}
