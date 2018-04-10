import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/Rx'; // for all
// https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs
// https://netbasal.com/rxjs-six-operators-that-you-must-know-5ed3b6e238a0
// http://blog.danieleghidoli.it/2016/10/22/http-rxjs-observables-angular/
// https://stackoverflow.com/questions/36984059/rxjs-array-of-observable-to-array

import 'rxjs/add/operator/mergeMap'; // this puts mergeMap onto observable
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

// show a loader on http requests
// https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef

// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable
import { User, Applications } from './security.interfaces';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class SecurityService implements Resolve<any> {

    private readonly URL_BASE = environment.securityAPIURL; // users/all

    constructor(private _http: Http) { }


    getAllUsers(): Observable<User[]> {

        // the map call turns string to json object
        const me = this;
        return this._http.get(this.URL_BASE + 'users/all', this.createRequestOpts())
            .map(res => res.json());


    }

    getAllApplications(): Observable<Applications[]> {

        // the map call turns string to json object
        const me = this;
        return this._http.get(this.URL_BASE + 'applications/all', this.createRequestOpts())
            .map(res => res.json());


    }
    createRequestOpts(): RequestOptions {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        headers.append('Access-Control-Allow-Origin', '*');
        return new RequestOptions({headers: headers});
    }

    deleteApplication(app: Applications) {
        const me = this;
        const r = this.createRequestOpts();
        const payload = new RequestOptions({headers: r.headers, body: app});

        return this._http.delete(this.URL_BASE + 'applications/delete', payload);
    }




    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const me = this;
        const data = {};
        return Observable.forkJoin(me.getAllApplications(),
            me.getAllUsers());

    }


}

