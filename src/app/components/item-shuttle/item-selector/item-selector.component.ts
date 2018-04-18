import { Component, OnInit, Input, SimpleChanges, OnChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { ShuttleData, GROUP_MEMBERSHIP, ActionItems} from '../shuttle.interfaces';
import { SelectControlValueAccessor, NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shuttle-item-selector',
  templateUrl: './item-selector.component.html',
  styleUrls: ['./item-selector.component.scss']
})
export class ItemSelectorComponent implements OnInit, OnChanges {

  @Input() shuttleData: ShuttleData[] = null;
  shuttleBuffer: ShuttleData[] = null;
  @Input() groupMemberShip: GROUP_MEMBERSHIP;
  selectedItems: ShuttleData[] = [];
  @ViewChild('f') selectorForm: NgForm;
  @Output() selectEvent = new EventEmitter();


  constructor() {

  }

  ngOnInit() {


  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.shuttleData) {

      this.shuttleBuffer = JSON.parse(JSON.stringify(changes.shuttleData.currentValue));

    }

  }

  compareFn(c1: ShuttleData, c2: ShuttleData): boolean {
    // return c1 && c2 ? c1.id === c2.id : c1 === c2;
    if (c1 && c2) {
      return c1.id === c2.id;
    }
    return c1 === c2;
  }

  onItemSelect(ev) {
    // console.log(typeof this.selectorForm.value.selectedItems.some);
    this.selectEvent.emit({ groupMemberShip: this.groupMemberShip, selectedItems: this.selectorForm.value.selectedItems });
    this.shuttleBuffer.forEach(b => {
      b.isSelected = false;
    });
    this.selectorForm.value.selectedItems.forEach(b => {
      b.isSelected = true;
    });

  }

  computeId() {
    return 'group-membership-' + GROUP_MEMBERSHIP[this.groupMemberShip];

  }


  computeOptionCss(currentItem: ShuttleData) {
    let cssValue = 'option-item ';
    if (this.selectorForm && this.selectorForm.value.selectedItems) {
      this.selectorForm.value.selectedItems.some(v => {
        if (v.id === currentItem.id) {
          cssValue = cssValue + 'chosen';
        }
      });
    }
    return cssValue;


  }
  getFilteredShuttleBuffer() {

    return this.shuttleBuffer;
  }

  /**
   * call these via viewchild in shuttle components to remove the items from the list
   * that have been selected
   *
   */
  removeSelectedItems() {

    this.shuttleBuffer = this.shuttleBuffer.filter(b => b.isSelected !== true);
  }
  getSelectedItems() {

    return this.selectorForm.value.selectedItems;
  }
  addItems(items: ShuttleData[]) {

    if (items) {

      items.forEach((p: ShuttleData) => {
        const newP = new ShuttleData(p.name, p.id, p.ref, p.source);
        this.shuttleBuffer.push(newP);
      });
    }
  }
  clearSelection() {
    this.shuttleBuffer = this.shuttleBuffer.map(b => {
      b.isSelected = false;
      return b;
    });
    this.selectedItems = [];
    this.selectorForm.reset(this.selectedItems);
  }


  findActionItems(): ActionItems {
    const me = this;
    const actionItems: ShuttleData[] = this.shuttleBuffer.filter(a => {
    //  console.log(`comparing ${a.source} to ${me.groupMemberShip}`);
      return a.source !== me.groupMemberShip;
    });

    return new ActionItems(me.groupMemberShip, actionItems);
  }

  resetSource(item, setTo: GROUP_MEMBERSHIP) {
    this.shuttleBuffer.map(b => {
      if (b.id === item.id) {
        b.source = setTo;
      }
      return b;
    });

  }

}
