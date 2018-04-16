import { Applications, User } from '../../services/security.interfaces';
import { EditType } from '../basic-selector/basic.interfaces';
import { FindValueSubscriber } from 'rxjs/operators/find';

export enum GROUP_MEMBERSHIP { IN, NOT_IN }

export class ShuttleData {

    name: string;
    id: number;
    ref: any;
    isSelected: boolean;
    public willBeAdded: boolean;
    public willBeRemoved: boolean;
    public source = null;

    constructor(name: string, id: number, ref: any, source: GROUP_MEMBERSHIP) {
        this.name = name;
        this.id = id;
        this.ref = ref;
        this.source = source;

    }
}


export class ShuttleStructure {
    inGroup: ShuttleData[];
    notInGroup: ShuttleData[];

    constructor(inData: any, notInData: any, type: EditType) {

        this.inGroup = inData.map(d => {
            if (type === EditType.Applications) {
                const app = d as Applications;
                return new ShuttleData(app.applicationName, app.id, app, GROUP_MEMBERSHIP.IN);

            } else {
                const user = d as User;
                return new ShuttleData(user.username, user.userid, user, GROUP_MEMBERSHIP.IN);
            }


        });
        this.notInGroup = notInData.map(d => {
            if (type === EditType.Applications) {
                const app = d as Applications;
                return new ShuttleData(app.applicationName, app.id, app, GROUP_MEMBERSHIP.NOT_IN);

            } else {
                const user = d as User;
                return new ShuttleData(user.username, user.userid, user, GROUP_MEMBERSHIP.NOT_IN);
            }


        });

    }
}
