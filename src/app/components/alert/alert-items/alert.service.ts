import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable() export class AlertService {
    private subject = new Subject<any>();
    private groupSubject = new Subject<any>();
    constructor() { }
    confirm(message: string, siFn: () => void, noFn: () => void) {
        this.setConfirmation(message, siFn, noFn);
    }
    setConfirmation(message: string, siFn: () => void, noFn: () => void) {
        const that = this;
        this.subject.next({
            type: 'confirm',
            text: message,
            siFn:
                function () {
                    that.subject.next(); // this will close the modal
                    siFn();
                },
            noFn: function () {
                that.subject.next();
                noFn();
            }
        });

    }


    confirmGroup(data: any, siFn: () => void, noFn: () => void) {

        const that = this;

        this.groupSubject.next(
            {
                type: 'confirm',
                data: data,
                siFn:
                    function () {
                        that.groupSubject.next(); // this will close the modal by sending a message with no data which resets the modal
                        siFn();
                    },
                noFn: function () {
                    that.groupSubject.next();
                    noFn();
                }
            }



        );



    }


    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    getGroupMessage(): Observable<any> {
        return this.groupSubject.asObservable();
    }
}
