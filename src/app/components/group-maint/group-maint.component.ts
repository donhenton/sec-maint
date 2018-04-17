import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EditState, SelectorData, EditType } from '../../components/basic-selector/basic.interfaces';
import { BasicSelectorComponent } from '../../components/basic-selector/basic-selector.component';
import { Group } from '../../services/security.interfaces';
import { AlertService } from '../../services/alert.service';
import { GroupMaintService } from '../../services/groupMaintService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-maint',
  templateUrl: './group-maint.component.html',
  styleUrls: ['./group-maint.component.scss']
})
export class GroupMaintComponent implements OnInit, OnChanges {

  selectedGroup: Group = new Group();
  groupState: EditState = EditState.INITIAL;
  @Output() selectEvent = new EventEmitter<any>();
  groupForm: FormGroup;
  groupsData: SelectorData[];
  @ViewChild('groupSelector') groupSelector: BasicSelectorComponent;
  @Input() initialGroupsData: Group[];

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private groupService: GroupMaintService) { }

  ngOnInit() {

    this.createGroupForm();

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.initialGroupsData) {

      // console.log(changes.initialGroupsData);
      this.generateSelectorData(changes.initialGroupsData.currentValue);
    }

  }

  updateList(data, action: EditState) {
    const selectorData: SelectorData = new SelectorData(data.groupName, data.id, data);
    this.groupSelector.updateDisplayItem(selectorData, action);

  }

  onFormSubmit() {

    const newGroup = new Group();
    const me = this;
    newGroup.groupName = this.groupForm.get('groupName').value;
    newGroup.id = -1;
    if (me.groupState === EditState.EDIT) {
      newGroup.id = this.selectedGroup.id;
    }
    console.log(`group obj ${JSON.stringify(newGroup)}`);

    this.groupService.addOrUpdate(newGroup, me.groupState).subscribe(data => {

      const returnedValue = JSON.parse(data._body);
      me.updateList(returnedValue, this.groupState);
      me.resetForm();

    }, error => {
      console.log('save problem ' + JSON.stringify(error.json()));
      me.resetForm();

    });


  }

  onFormCancel(ev) {

    this.resetForm();
  }

  resetForm() {
    this.groupForm.reset({ groupName: '' });
    this.groupState = EditState.INITIAL;
    this.selectedGroup = new Group();
  }

  generateSelectorData(data) {
    if (data) {
      this.groupsData = data.map(d => {
        return new SelectorData(d.groupName, d.id, d);
      });
    } else {
      this.groupsData = [];
    }
  }

  onSelectGroup(data) {
    this.groupState = data.type;
    this.selectedGroup = data.selected.ref;
    const me = this;
    if (this.groupState === EditState.DELETE) {
      const message = `Do you wish to delete '${this.selectedGroup.groupName}'?`;

      this.alertService.confirm(message, function () {
        // this is the yes branch

        me.groupService.deleteGroup(me.selectedGroup).subscribe(d => {

          me.groupService.getAllGroups().subscribe(groups => {

            me.groupState = EditState.INITIAL;
            me.selectedGroup = new Group();
            me.generateSelectorData(groups);
            me.selectEvent.emit({ group: null, action: EditState.DELETE });


          }, error => {
            console.log(JSON.stringify(error.json()));
            me.groupState = EditState.INITIAL;
            me.selectedGroup = new Group();
          });
        });


      }, function () {
        // ACTION: Do this if user says NO
        me.resetForm();
      });


    } else {
      // asking for a select
      this.groupForm.reset({ groupName: this.selectedGroup.groupName });
      this.selectEvent.emit({ group: this.selectedGroup, action: EditState.EDIT });
    }



  }


  createGroupForm() {

  this.groupForm = this.formBuilder.group({
    groupName: ['', Validators.required]
  });



}


// this handles the add/cancel for the add action

onAddOrCancel(d) {

  const requestedType: EditType = Number(EditType[d.type]);
  const requestedAction: EditState = Number(EditState[d]);
  this.groupState = requestedAction;

}


}


