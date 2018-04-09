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
import { SecurityService } from '../services/securityService';
import { BasicSelectorComponent } from './components/basic-selector/basic-selector.component';
import { ApplicationFormComponent } from './components/application-form/application-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';



const appRoutes: Routes = [

  { path: 'usersApps', component: UsersAppsComponent , resolve: {usersAppsData: SecurityService }},

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
    UserFormComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
