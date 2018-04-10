import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  message: any = {type: 'initial'};
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }
  ngOnInit() {
    // this function waits for a message from alert service, it gets
    // triggered when we call this from any other component
    // console.log('alert is init');
    this.alertService.getMessage().subscribe(message => {
      // console.log('got a message ' + JSON.stringify(message));
      if (message ) {
        this.message = message;
      } else {
        // apparently clicking on yes or no issues a message somehow
        this.message = {type: 'initial'};
      }

    });
  }
}
