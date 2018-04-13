import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupMaintComponent } from '../../components/group-maint/group-maint.component';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit {

  @ViewChild('appGroupMaintainer') groupMaintainer: GroupMaintComponent;
  constructor() { }

  ngOnInit() {
  }

}
