import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable
import { Group } from './security.interfaces';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './securityService';
import { EditState } from '../components/basic-selector/basic.interfaces';

@Injectable()
export class GroupMaintService implements Resolve<any> {

    private readonly URL_BASE = environment.securityAPIURL; // users/all
    constructor(private _http: Http, private securityService: SecurityService) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const me = this;
        const data = {};
        return this.getAllGroups();

    }

    getAllGroups(): Observable<Group[]> {

        // the map call turns string to json object
        const me = this;
        return this._http.get(this.URL_BASE + 'groups/all', this.securityService.createRequestOpts())
            .map(res => res.json());

    }

    deleteGroup(group: Group) {
        const r = this.securityService.createRequestOpts();
        const payload = new RequestOptions({ headers: r.headers, body: group });
        return this._http.delete(this.URL_BASE + 'groups/delete', payload);
    }

    addGroup(group: Group): Observable<any> {
        group.id = 0;
        return this._http.post(this.URL_BASE + 'groups/add', group);
    }

    updateGroup(group: Group): Observable<any> {

        return this._http.put(this.URL_BASE + 'groups/save', group);
    }

    addOrUpdate(group: Group, action: EditState) {
        const me = this;
        if (action === EditState.ADD) {
            return me.addGroup(group);

        }
        if (action === EditState.EDIT) {
            return me.updateGroup(group);

        }
    }

    getApplicationsInGroup(g: Group) {
        return this._http.get(this.URL_BASE + `groups/applications/${g.id}`).map(res => res.json());
    }

    getApplicationsNotInGroup(g: Group) {
        return this._http.get(this.URL_BASE + `groups/applications/not/${g.id}`).map(res => res.json());
    }
    /*
    returns an array pos0 is the apps IN the group pos 1 is NOT IN group
    */
    getApplicationsDataForGroup(g: Group) {
        const me = this;
        return Observable.forkJoin(me.getApplicationsInGroup(g),
            me.getApplicationsNotInGroup(g));


    }


}