import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applications, User } from '../../services/security.interfaces';
import { SelectorData, EditState, EditType, AppsUpdate } from '../../components/basic-selector/basic.interfaces';
import { BasicSelectorComponent } from '../../components/basic-selector/basic-selector.component';
import { AlertService } from './../../components/alert/alert-items/alert.service';
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

  onAddOrCancel(d) {

    const me = this;
    // d.request REVERT OR ADD
    // d.type Applications or Users
    // http:// www.dailycoding.com/Posts/enum_coversion_operations_int_to_enum_enum_to_int_string_to_enum_enum_to_string.aspx
    // EditType[d.type] gets the index value in the enum from a string d.type == 'Applicatons'

    const requestedType: EditType = Number(EditType[d.type]);
    const requestedAction: EditState = Number(EditState[d.request]);

    if (requestedType === EditType.Applications) {
      this.appState = requestedAction;
    } else {
      this.userState = requestedAction;
    }


  }

  handleFormAction(d: AppsUpdate) {

    const me = this;
   // debugger;
    let action: EditState;
    // d.action is EditState.SAVE or EditState.CANCEL
    if (d.type === EditType.Applications) {
      action = this.appState;
    } else {
      action = this.userState;
    }

    console.log('handleFormAction ' + action + ' ' + d.action);

    if (d.action === EditState.FORM_SAVE) {
      //   console.log('form asking for a save ' + JSON.stringify(d.newApp));

      this.securityService.addOrUpdate(d.payload, d.type, action).subscribe(data => {
       // debugger
        console.log('save success ' + JSON.stringify(data));
        if (d.type === EditType.Applications) {
          me.appState = EditState.INITIAL;
          me.selectedApp = new Applications();
        } else {
          me.userState = EditState.INITIAL;
          me.selectedUser = new User();
        }
        const returnedValue = JSON.parse(data._body);
        me.updateList(returnedValue, d.type, action);


      }, error => {
        console.log('save problem ' + JSON.stringify(error.json()));
        me.appState = EditState.INITIAL;
        if (d.type === EditType.Applications) {
          me.selectedApp = new Applications();
        } else {

          me.selectedUser = new User();
        }
      });




    } else {
      // asking for a CANCEL
      console.log('cancel 1 ' + JSON.stringify(d));
      if (d.type === EditType.Applications) {
        this.appState = EditState.INITIAL;
        me.selectedApp = new Applications();
        // this.appsSelector.doItemUpdate(d);
      }
      if (d.type === EditType.Users) {
        this.userState = EditState.INITIAL;
        me.selectedUser = new User();
        // this.usersSelector.doItemUpdate(d);
      }
    }

  }

  updateList(data: any, type: EditType, action: EditState) {
    let selectorData: SelectorData;
    if (type === EditType.Applications) {
      selectorData = new SelectorData(data.applicationName, data.id, data);
      this.appsSelector.updateDisplayItem(selectorData, action);
      this.appState = EditState.INITIAL;
    } else {
      selectorData = new SelectorData(data.username, data.userid, data);
      this.usersSelector.updateDisplayItem(selectorData, action);
      this.userState = EditState.INITIAL;

    }


  }

  whichFormIsActive(): EditType {
    if (this.appState !==  EditState.INITIAL && this.userState === EditState.INITIAL) {
      return EditType.Applications;
    }
    if (this.userState !==  EditState.INITIAL && this.appState === EditState.INITIAL) {
      return EditType.Users;
    }
    return null;

  }

  computeFormClass(type) {

    const cssItems = [];
    const requestedType: EditType = Number(EditType[type]);
    if (requestedType === EditType.Applications) {
      // cssItems.push('column50Right');
    } else {
      // cssItems.push('column50Left');
    }
   // console.log('1');
    if (!this.whichFormIsActive() === null) {
      return [];
    }
   // console.log('2');
    if (this.whichFormIsActive() === EditType.Applications && requestedType === EditType.Applications) {
      cssItems.push('form-active');
    }
    if (this.whichFormIsActive() === EditType.Users && requestedType === EditType.Users) {
      cssItems.push('form-active');
    }
    if (this.whichFormIsActive() === EditType.Applications && requestedType === EditType.Users) {
      cssItems.push('form-non-active');
    }
    if (this.whichFormIsActive() === EditType.Users && requestedType === EditType.Applications) {
      cssItems.push('form-non-active');
    }
    return cssItems;
  }

  onSelectUser(data) {
    this.userState = data.type;
    this.selectedUser = data.selected.ref;
    const me = this;

    if (this.userState === EditState.DELETE) {
      const message = `Do you wish to delete '${this.selectedUser.username}'?`;
      this.alertService.confirm(message, function () {
        // this is the yes branch
        me.securityService.deleteUser(me.selectedUser).subscribe(d => {

          const oldAppData = me.appData.getApplicatons();
          me.securityService.getAllUsers().subscribe(users => {

            me.appData = new AppData(oldAppData, users);
            me.userState = EditState.INITIAL;
            me.selectedUser = new User();

          }, error => {
            console.log(error.json());
            me.userState = EditState.INITIAL;
            me.selectedUser = new User();
          });
        });
      }, function () {
        // ACTION: Do this if user says NO
        // console.log('got a no');
        me.userState = EditState.INITIAL;
        me.selectedUser = new User();
      });



    }






  }

  onSelectApp(data) {
    this.appState = data.type;
    const me = this;
    this.selectedApp = data.selected.ref;
    console.log('selecting app ' + JSON.stringify(this.selectedApp));
    if (this.appState === EditState.DELETE) {
      const message = `Do you wish to delete '${this.selectedApp.applicationName}'?`;
      this.alertService.confirm(message, function () {
        // this is the yes branch
        me.securityService.deleteApplication(me.selectedApp).subscribe(d => {

          const oldUserData = me.appData.getUsers();
          me.securityService.getAllApplications().subscribe(apps => {

            me.appData = new AppData(apps, oldUserData);
            me.appState = EditState.INITIAL;
            me.selectedApp = new Applications();

          }, error => {
            console.log(error.json());
            me.appState = EditState.INITIAL;
            me.selectedApp = new Applications();
          });


        });

      }, function () {
        // ACTION: Do this if user says NO
        // console.log('got a no');
        me.appState = EditState.INITIAL;
        console.log('after cancel on delete dialog');
        me.selectedApp = new Applications();
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
