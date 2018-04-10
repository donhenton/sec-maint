import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applications, User } from '../../services/security.interfaces';
import { SelectorData, EditState, EditType } from '../../components/basic-selector/basic.interfaces';
import { BasicSelectorComponent } from '../../components/basic-selector/basic-selector.component';
import { AlertService } from '../../services/alert.service';
import { SecurityService } from './../../services/securityService';


@Component({
  selector: 'app-users-apps',
  templateUrl: './users-apps.component.html',
  styleUrls: ['./users-apps.component.scss']
})
export class UsersAppsComponent implements OnInit {

  appData: AppData;
  selectedUser: User = new User();
  selectedApp: Applications = new Applications();
  userState: EditState = EditState.INITIAL;
  appState: EditState = EditState.INITIAL;
  @ViewChild('appsSelector') appsSelector: BasicSelectorComponent;
  @ViewChild('usersSelector') usersSelector: BasicSelectorComponent;


  constructor(private route: ActivatedRoute,
    private securityService: SecurityService,
    private alertService: AlertService) { }

  ngOnInit() {

    // https://seegatesite.com/how-to-load-all-data-before-rendering-view-component-in-angular-4/
    // https://shermandigital.com/blog/wait-for-data-before-rendering-views-in-angular-2/
    this.route.data
      .subscribe((data) => {
        this.appData = new AppData(data.usersAppsData[0], data.usersAppsData[1]);
      });

  }

  handleFormAction(d) {

    // currently CANCEL AND SAVE arent' checked because they yield the same result
    // but you could
    // see AppsUpdate  from './../basic-selector/basic.interfaces';

    if (d.type === EditType.Applications) {
      this.appState = EditState.INITIAL;
      this.appsSelector.doItemUpdate(d);
    }
    if (d.type === EditType.Users) {
      this.userState = EditState.INITIAL;
      this.usersSelector.doItemUpdate(d);
    }
  }

  onSelectUser(data) {
    this.userState = data.type;
    this.selectedUser = data.selected.ref;

  }

  onSelectApp(data) {
    this.appState = data.type;
    const me = this;
    this.selectedApp = data.selected.ref;
    if (this.appState === EditState.DELETE) {
      const message = `Do you wish to delete '${this.selectedApp.applicationName}'?`;
      this.alertService.confirm(message, function () {
        // this is the yes branch
        me.securityService.deleteApplication(me.selectedApp).subscribe(d => {

          const oldUserData = me.appData.getUsers();
          me.securityService.getAllApplications().subscribe(apps => {

            me.appData = new AppData(apps, oldUserData);
            me.appState = EditState.INITIAL;

          }, error => {
            console.log(error.json());
            me.appState = EditState.INITIAL;
          });


        });

      }, function () {
        // ACTION: Do this if user says NO
       // console.log('got a no');
       me.appState = EditState.INITIAL;
      });



    }

  }


}


class AppData {

  usersData: SelectorData[] = [];
  appsData: SelectorData[] = [];

  constructor(private applications: Applications[], private users: User[]) {


    users.forEach(d => {
        const newD = JSON.parse(JSON.stringify(d));
      this.usersData.push(new SelectorData(d.username, d.userid, newD));
    });
    applications.forEach(d => {
        const newD = JSON.parse(JSON.stringify(d));
      this.appsData.push(new SelectorData(d.applicationName, d.id, newD));
    });

  }

  getUsers(): User[] { return this.users; }
  getApplicatons(): Applications[] { return this.applications; }

}
