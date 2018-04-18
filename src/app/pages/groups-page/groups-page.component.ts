import { Component, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { GroupMaintComponent } from '../../components/group-maint/group-maint.component';
import { EditState, EditType } from '../../components/basic-selector/basic.interfaces';
import { GroupMaintService } from '../../services/groupMaintService';
import { ShuttleStructure } from '../../components/item-shuttle/shuttle.interfaces';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../services/security.interfaces';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {


  applicationData: ShuttleStructure;
  @ViewChild('appGroupMaintainer') groupMaintainer: GroupMaintComponent;
  shuttleMetaData = { assignedTo: 'n/a', selectedGroup: '' };
  groupsData: Group[];
  maintType: EditType;


  constructor(private groupService: GroupMaintService, private route: ActivatedRoute, ) { }

  ngOnInit() {
    const me = this;
    this.route.data
      .subscribe((data) => {
        me.groupsData = data.groupsData.groupsData;
        me.maintType = data.maintType;
        me.shuttleMetaData.assignedTo = EditType[me.maintType];

      });

  }

  /**
   *
   * @param ev {'request': 'reloadShuttleItems'}
   */
  onShuttleEvent(ev: any) {
    console.log(`shuttleEvent ${JSON.stringify(ev)}`);
  }

  // {group null if DELETE, else selectedGroup, action EditState.EDIT or DELETE}
  handleGroupSelect(data) {
    const me = this;

    if (data.action === EditState.EDIT) {

      let dataObs: Observable<any> = null;
      if (me.maintType === EditType.Applications) {
        dataObs = this.groupService.getApplicationsDataForGroup(data.group);
      } else {
        dataObs = this.groupService.getUsersDataForGroup(data.group);
      }

      dataObs.subscribe(successData => {
        me.applicationData = new ShuttleStructure(successData[0], successData[1], me.maintType);
        me.shuttleMetaData.selectedGroup = data.group;


      }, error => {

        console.error('ERROR in groups-page\n' + JSON.stringify(error.json()));

      });

    } else {
      // handle DELETE

    }

  }

}
