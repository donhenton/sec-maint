import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Applications } from '../../../services/security.interfaces';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {EditState} from './../basic-selector/basic.interfaces';

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


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.createAppForm();
  }
  ngOnChanges(cc: SimpleChanges) {
    // console.log(cc.selectedApp);
    if (this.appForm && cc.selectedApp) {
       this.appForm.reset({applicationName: cc.selectedApp.currentValue.applicationName});
    }

  }

  onFormSubmit() {
    console.log('submit ' + this.appForm.get('applicationName').value);
    this.formAction.emit({ type: 'APPLICATIONS', action: 'SAVE'});

  }

  createAppForm() {
    this.appForm = this.formBuilder.group({
      applicationName: ['', Validators.required]
    });
  }

}
