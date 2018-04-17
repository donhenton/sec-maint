import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild, EventEmitter, Output } from '@angular/core';
import { ShuttleData, ShuttleStructure, GROUP_MEMBERSHIP, ActionItems } from './shuttle.interfaces';
import { ItemSelectorComponent } from './item-selector/item-selector.component';
import { EditType } from '../basic-selector/basic.interfaces';
import { Action } from 'rxjs/scheduler/Action';
import { AlertService } from '../../services/alert.service';
import { GroupMaintService } from '../../services/groupMaintService';


@Component({
  selector: 'app-item-shuttle',
  templateUrl: './item-shuttle.component.html',
  styleUrls: ['./item-shuttle.component.scss']
})
export class ItemShuttleComponent implements OnInit, OnChanges {

  @Input() shuttleItems: ShuttleStructure;
  @Input() maintType: EditType;
  @Input() shuttleMetaData: any = { assignedTo: '<assignedTo>' };
  @ViewChild('selectorInGroup') inGroupSelector: ItemSelectorComponent;
  @ViewChild('selectorNotInGroup') notInGroupSelector: ItemSelectorComponent;
  @Output() shuttleEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private alertService: AlertService, private groupService: GroupMaintService) { }
  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.shuttleItems && changes.shuttleItems.firstChange === false) {
      if (this.notInGroupSelector) {
        this.notInGroupSelector.clearSelection();
        this.inGroupSelector.clearSelection();
      }
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
      selectionCount = this.notInGroupSelector.getSelectedItems() ? this.notInGroupSelector.getSelectedItems().length : 0;
    } else {
      selectionCount = this.inGroupSelector.getSelectedItems() ? this.inGroupSelector.getSelectedItems().length : 0;
    }
    // console.log(`selectionCount ${selectionCount} ${type}`);
    if (selectionCount === 0) {
      return 'shuttle-button-inactive';
    }
    return 'shuttle-button-active';
  }

  requestInToNotIn() {
    const selectedInGroupItems = this.inGroupSelector.getSelectedItems().map((p: ShuttleData) => {
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

  performUpdates(inActions, notInActions): void {
    console.log('got a yes');
    this.groupService.maintainGroups(inActions, notInActions,
      this.maintType, this.shuttleMetaData.selectedGroup)
      .subscribe(success => {

        console.log('success ' + JSON.stringify(success));
      },
        error => {
          console.error('error ' + JSON.stringify(error.json()));
        }

      )
      ;
  }


  handleShuttleUpdate() {
    const notInActions: ActionItems = this.notInGroupSelector.findActionItems();
    const inActions: ActionItems = this.inGroupSelector.findActionItems();
    const me = this;
    const yesFunction = function () {
      me.performUpdates(inActions, notInActions);
    };
    const noFunction = function () { console.log('got a no'); };

    const data = {
      data: { inActions, notInActions }, maintType: EditType[this.maintType],
      selectedGroup: this.shuttleMetaData.selectedGroup
    };
    this.alertService.confirmGroup(data, yesFunction, noFunction);


    // console.log(`you are processing ${EditType[this.maintType]}`);
    // this.notInGroupSelector.clearSelection();
    // this.inGroupSelector.clearSelection();
    // this.reloadShuttleItems();
    // this.shuttleEvent.emit({ 'request': 'reloadShuttleItems' });

  }

}
