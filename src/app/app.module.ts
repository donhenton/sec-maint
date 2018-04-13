import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DropdownDirective } from './components/dropdown/dropdown.directive';
import { MenuDirective } from './components/dropdown/menu.directive';
import { UsersAppsComponent } from './pages/users-apps/users-apps.component';
import { SecurityService } from './services/securityService';
import { BasicSelectorComponent } from './components/basic-selector/basic-selector.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { GroupMaintComponent } from './components/group-maint/group-maint.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GroupMaintService } from './services/groupMaintService';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';




const appRoutes: Routes = [

  {
    path: 'usersApps', component: UsersAppsComponent,
    resolve: { usersAppsData: SecurityService }
  },

  {
    path: 'groupMaint', component: GroupsPageComponent,
    resolve: { groupsData: GroupMaintService }
  },

  {
    path: 'assignments', component: AssignmentsComponent
  },
// { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '', component: MainPageComponent
  },

];


@NgModule({
  declarations: [
    AppComponent,
    MenuDirective,
    DropdownDirective,
    UsersAppsComponent,
    UsersAppsComponent,
    BasicSelectorComponent,
    ApplicationFormComponent,
    UserFormComponent,
    AlertComponent,
    GroupMaintComponent,
    AssignmentsComponent,
    MainPageComponent,
    GroupsPageComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SecurityService, AlertService, GroupMaintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
