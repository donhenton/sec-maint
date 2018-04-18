import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'group-maint-alert',
  templateUrl: './group-maint-alert.component.html',
  styleUrls: ['./group-maint-alert.component.scss']
})
export class GroupMaintAlertComponent implements OnInit {
  displayData: any = {type: 'initial'};

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    // this function waits for a data from alert service, it gets
    // triggered when we call this from any other component
    // console.log('alert is init');
    this.alertService.getGroupMessage().subscribe(actionData => {

      if (actionData) {
        this.displayData['siFn'] = actionData.siFn ;
        this.displayData['type'] = actionData.type ;
        this.displayData['noFn'] = actionData.noFn ;
        this.displayData['data'] = actionData.data.data;
        this.displayData['maintType'] = actionData.data.maintType;
        this.displayData['selectedGroup'] = actionData.data.selectedGroup;
     //   console.log(this.displayData);

      } else {
        this.displayData = {type: 'initial'};

      }

    });
  }
}
