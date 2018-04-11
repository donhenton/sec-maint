import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Applications, User } from '../../services/security.interfaces';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EditState, EditType, AppsUpdate } from './../basic-selector/basic.interfaces';
import { SecurityService } from '../../services/securityService';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnChanges {

  @Input() selectedApp: Applications;
  @Input() selectedUser: User;
  appForm: FormGroup;
  @Input() editState: EditState = EditState.INITIAL;
  @Input() formTargetInput: any;
  formTarget: EditType; // are you editing users or applications
  @Output() formAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, securityService: SecurityService) {

    // console.log('init');

  }

  ngOnInit() {

  }
  ngOnChanges(change: SimpleChanges) {
    // console.log(JSON.stringify(change));
    // console.log('form is '+this.appForm);
    if (change.formTargetInput) {
      this.formTarget = Number(EditType[this.formTargetInput]);
      // console.log(`formTarget ${this.formTarget}`);
      this.createAppForm();
    }

    if (this.appForm && change.selectedApp) {
      this.setFromToSelectedItem(change);
    }
    if (this.appForm && change.selectedUser) {
      this.setFromToSelectedItem(change);
    }
    if (change.editState) {
      if (this.appForm && change.editState.previousValue !== EditState.INITIAL &&
        change.editState.currentValue === EditState.INITIAL) {
        // requesting a reset of the form
        this.resetFormToEmpty();

      }

    }

  }

  setFromToSelectedItem(change) {
    if (this.formTarget === EditType.Applications) {
      this.appForm.reset({ applicationName: change.selectedApp.currentValue.applicationName });
    } else {
     // {{this.selectedUser.userid}}

     this.appForm.reset({ username: change.selectedUser.currentValue.username, login: change.selectedUser.currentValue.login });
    }
  }

  resetFormToEmpty() {
    this.appForm.reset({ applicationName: '' });
  }

  onCancel(ev) {

    this.editState = EditState.INITIAL;
    if (this.formTarget === EditType.Applications) {
      const newApp = new Applications();
      const me = this;
      newApp.id = this.selectedApp.id;
      newApp.applicationName = this.appForm.get('applicationName').value;
      const appUpdate: AppsUpdate = new AppsUpdate(EditType.Applications, EditState.FORM_CANCEL, newApp);
      me.formAction.emit(appUpdate);
    } else {

    }
    this.resetFormToEmpty();
  }

  onFormSubmit() {
    if (this.formTarget === EditType.Applications) {
      const newApp = new Applications();
      const me = this;
      newApp.id = this.selectedApp.id;
      newApp.applicationName = this.appForm.get('applicationName').value;
      const appUpdate: AppsUpdate = new AppsUpdate(EditType.Applications, EditState.FORM_SAVE, newApp);
      me.formAction.emit(appUpdate);
    } else {

    }

  }

  showForm(type) {

    const requestedType: EditType = Number(EditType[type]);

    if (this.formTarget === requestedType ) {
      return true;
    }
    return false;
  }

  createAppForm() {
    if (this.formTarget === EditType.Applications) {
      this.appForm = this.formBuilder.group({
        applicationName: ['', Validators.required]
      });
    } else {
      this.appForm = this.formBuilder.group({

        username: ['', Validators.required],
        login:  ['', Validators.required]


      });
    }
  }

}
