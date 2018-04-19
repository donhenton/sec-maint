import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';


@Injectable() export class ErrorService {
    private errorSubject = new Subject<any>();

    constructor() { }
    setError(e: any) {
        let message = 'general error';
        if (e.message) {
            message = e.message;
        } else {
            message = JSON.stringify(e);
        }

        this.errorSubject.next({
            type: ERROR_MESSAGE_TYPE.ERROR,
            text: message
        });

    }

    clearError(location) {
      //  console.log(`clearing ${location}`);
        this.errorSubject.next({
            type: ERROR_MESSAGE_TYPE.CLEAR,
            location: location
        });

    }

    getErrorSubject() {
        return this.errorSubject;
    }



}

export enum ERROR_MESSAGE_TYPE { ERROR, CLEAR }
