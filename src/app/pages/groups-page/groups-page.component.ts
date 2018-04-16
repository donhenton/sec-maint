import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { GroupMaintComponent } from '../../components/group-maint/group-maint.component';
import { EditState, EditType } from '../../components/basic-selector/basic.interfaces';
import { GroupMaintService } from '../../services/groupMaintService';
import { ShuttleStructure } from '../../components/item-shuttle/shuttle.interfaces';





@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {


  applicationData: ShuttleStructure;
  @ViewChild('appGroupMaintainer') groupMaintainer: GroupMaintComponent;
  selectorHeight = '250px';
  constructor(private groupService: GroupMaintService) {


  }

  ngOnInit() {
  }

  // {group null if DELETE, else selectedGroup, action EditState.EDIT or DELETE}
  handleGroupSelect(data) {
    const me = this;
    if (data.action === EditState.EDIT) {
      this.groupService.getApplicationsDataForGroup(data.group).subscribe(successData => {
        me.applicationData = new ShuttleStructure(successData[0], successData[1], EditType.Applications);


      }, error => {

        console.error(JSON.stringify(error.json()));

      });

    } else {
      // handle DELETE

    }

  }

}
