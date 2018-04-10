import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Applications } from '../../services/security.interfaces';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { EditState, EditType, AppsUpdate, FormAction } from './../basic-selector/basic.interfaces';
import { SecurityService } from '../../services/securityService';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnChanges {

  @Input() selectedApp: Applications;
  appForm: FormGroup;
  @Input() editState: EditState = EditState.INITIAL;
  @Output() formAction: EventEmitter<any> = new EventEmitter<any>();


  constructor(private formBuilder: FormBuilder, securityService: SecurityService) { }

  ngOnInit() {
    this.createAppForm();
  }
  ngOnChanges(cc: SimpleChanges) {
    console.log(cc);
    if (this.appForm && cc.selectedApp) {
      this.appForm.reset({ applicationName: cc.selectedApp.currentValue.applicationName });
    }
    if (cc.editState) {
      if (this.appForm && cc.editState.previousValue !== EditState.INITIAL &&
        cc.editState.currentValue === EditState.INITIAL) {
          // requesting a reset of the form
          this.appForm.reset({ applicationName: '' });

      }


    }

  }


  onCancel(ev) {

    const newApp = new Applications();
    const me = this;
    newApp.id = this.selectedApp.id;
    newApp.applicationName = this.appForm.get('applicationName').value;
    const appUpdate: AppsUpdate = new AppsUpdate(EditType.Applications, FormAction.CANCEL, newApp);
    me.formAction.emit(appUpdate);
  }

  onFormSubmit() {

    const newApp = new Applications();
    const me = this;
    newApp.id = this.selectedApp.id;
    newApp.applicationName = this.appForm.get('applicationName').value;
    const appUpdate: AppsUpdate = new AppsUpdate(EditType.Applications, FormAction.SAVE, newApp);
    me.formAction.emit(appUpdate);


  }

  createAppForm() {

    this.appForm = this.formBuilder.group({
      applicationName: ['', Validators.required]
    });
  }

}
