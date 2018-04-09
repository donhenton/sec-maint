import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Applications, User } from '../../../services/security.interfaces';
import { SelectorData } from '../../components/basic-selector/basic.interfaces';


@Component({
  selector: 'app-users-apps',
  templateUrl: './users-apps.component.html',
  styleUrls: ['./users-apps.component.scss']
})
export class UsersAppsComponent implements OnInit {

  appData: AppData;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // https://seegatesite.com/how-to-load-all-data-before-rendering-view-component-in-angular-4/
    // https://shermandigital.com/blog/wait-for-data-before-rendering-views-in-angular-2/
    this.route.data
      .subscribe((data) => {
        this.appData = new AppData(data.usersAppsData[0], data.usersAppsData[1]);
      });

  }

}


class AppData {

  usersData: SelectorData[] = [];
  appsData: SelectorData[] = [];

  constructor(private applications: Applications[], private users: User[]) {


    users.forEach(d => {
      this.usersData.push(new SelectorData(d.username, d.userid));
    });
    applications.forEach(d => {
      this.appsData.push(new SelectorData(d.applicationName, d.id));
    });


  }

}
