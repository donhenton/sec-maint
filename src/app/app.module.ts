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
import { GroupMaintAlertComponent } from './components/group-maint-alert/group-maint-alert.component';
import { ErrorService } from './services/error.service';
import { GroupMaintComponent } from './components/group-maint/group-maint.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GroupMaintService } from './services/groupMaintService';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { ItemShuttleComponent } from './components/item-shuttle/item-shuttle.component';
import { ItemSelectorComponent } from './components/item-shuttle/item-selector/item-selector.component';
import { EditType } from './components/basic-selector/basic.interfaces';
import { AlertMainModule } from './modules/alert/alert-main.module';




const appRoutes: Routes = [

  {
    path: 'usersApps', component: UsersAppsComponent,
    resolve: { usersAppsData: SecurityService }
  },

  {
    path: 'groupMaint', component: GroupsPageComponent,
    resolve: { groupsData: GroupMaintService },
    data: {maintType:  EditType.Applications}
  },

  {
    path: 'userMaint', component: GroupsPageComponent,
    resolve: { groupsData: GroupMaintService },
    data: {maintType:  EditType.Users}
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
    GroupMaintAlertComponent,
    GroupMaintComponent,
    MainPageComponent,
    GroupsPageComponent,
    ItemShuttleComponent,
    ItemSelectorComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AlertMainModule.forRoot() // used here to get the provider
  ],
  providers: [SecurityService, GroupMaintService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
