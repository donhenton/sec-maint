import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable() export class AlertService {
     private subject = new Subject<any>();
     constructor() {}
     confirm(message: string, siFn: () => void, noFn: () => void) {
       this.setConfirmation(message, siFn, noFn);
     }
     setConfirmation(message: string, siFn: () => void, noFn: () => void) {
       const that = this;
       this.subject.next({ type: 'confirm',
                   text: message,
                   siFn:
                   function() {
                       that.subject.next(); // this will close the modal
                       siFn();
                   },
                   noFn: function() {
                       that.subject.next();
                       noFn();
                   }
                });

            }

     getMessage(): Observable<any> {
        return this.subject.asObservable();
     }
  }
