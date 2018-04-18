import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import { mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx'; // NOT from 'rxjs/Rx/Observable
import { Group } from './security.interfaces';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SecurityService } from './securityService';
import { EditState, EditType } from '../components/basic-selector/basic.interfaces';
import { ActionItems } from '../components/item-shuttle/shuttle.interfaces';

@Injectable()
export class GroupMaintService implements Resolve<any> {


    private readonly URL_BASE = environment.securityAPIURL; // users/all
    constructor(private _http: Http, private securityService: SecurityService) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        const me = this;
        const maintType: EditType = route.data['maintType'];
        //   if (maintType === EditType.Applications)
        return this.getAllGroups(maintType);

    }

    getAllGroups(maintType = null): Observable<any> {

        // the map call turns string to json object
        const me = this;
        return this._http.get(this.URL_BASE + 'groups/all', this.securityService.createRequestOpts())
            .map(res => res.json())
            .map((d) => {
                return { groupsData: d, maintType: maintType };
            });


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

    getApplicationsInGroup(g: Group): Observable<any> {
        return this._http.get(this.URL_BASE + `groups/applications/${g.id}`).map(res => res.json());
    }

    getApplicationsNotInGroup(g: Group): Observable<any> {
        return this._http.get(this.URL_BASE + `groups/applications/not/${g.id}`).map(res => res.json());
    }

    getUsersInGroup(g: Group): Observable<any> {
        return this._http.get(this.URL_BASE + `groups/users/${g.id}`).map(res => res.json());
    }

    getUsersNotInGroup(g: Group): Observable<any> {
        return this._http.get(this.URL_BASE + `groups/users/not/${g.id}`).map(res => res.json());
    }

    /*
    returns an array pos0 is the apps IN the group pos 1 is NOT IN group
    */
    getApplicationsDataForGroup(g: Group): Observable<any> {
        const me = this;
        return Observable.forkJoin(me.getApplicationsInGroup(g),
            me.getApplicationsNotInGroup(g));


    }

    getUsersDataForGroup(g: Group): Observable<any> {
        const me = this;
        return Observable.forkJoin(me.getUsersInGroup(g),
            me.getUsersNotInGroup(g));


    }



    maintainGroups(inActions: ActionItems, notInActions: ActionItems,
        type: EditType, currentGroup: Group): Observable<any> {
        const me = this;
        let urlType = 'Application';
        if (type === EditType.Users) {
            urlType = 'User';
        }
        const urlCalls = [];
        // remove calls
        notInActions.items.forEach(app => {
            const removeUrl = this.URL_BASE + `groups/remove${urlType}/${app.id}/group/${currentGroup.id}`;
            // console.log(`doing remove ${removeUrl} ${app.name}`);
            urlCalls.push({ type: 'remove', url: removeUrl, sourceType: type });
        });

        inActions.items.forEach(app => {
            const addUrl = this.URL_BASE + `groups/add${urlType}/${app.id}/group/${currentGroup.id}`;
            // console.log(`doing add ${addUrl} ${app.name}`);
            urlCalls.push({ type: 'add', url: addUrl, sourceType: type });
        });
        // https://blog.angularindepth.com/practical-rxjs-in-the-wild-requests-with-concatmap-vs-mergemap-vs-forkjoin-11e5b2efe293

        return Observable.from(urlCalls).pipe(

            mergeMap((urlData, index) => {
                return me._http.put(urlData.url, null).map(res => {
                    const r = res.json();
                    r['type'] = urlData.type;
                    if (type === EditType.Users) {
                        r['id'] = r.userid;
                    }
                    return r;

                });
            })

        ); // end pipe


    }


}
