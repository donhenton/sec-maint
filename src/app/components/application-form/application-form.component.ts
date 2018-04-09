import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Applications } from '../../../services/security.interfaces';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent implements OnInit, OnChanges {

  @Input() selectedApp: Applications;
  appForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.createAppForm();
  }
  ngOnChanges(cc: SimpleChanges) {
    console.log(cc.selectedApp.currentValue.applicationName);
    if (this.appForm) {
      this.appForm.patchValue({applicationName: cc.selectedApp.currentValue.applicationName});
    }

  }

  onFormSubmit() {

  }

  createAppForm() {
    this.appForm = this.formBuilder.group({
      applicationName: ['', Validators.required]
    });
  }

}
