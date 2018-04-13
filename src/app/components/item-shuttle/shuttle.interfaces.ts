import { Applications, User } from '../../services/security.interfaces';
import { EditType } from '../basic-selector/basic.interfaces';


 export class ShuttleData {

    name: string;
    id: number;
    ref: any;
    isSetToAssign = false;

    constructor(name: string, id: number,  ref: any, isSetToAssign: boolean = false, ) {
       this.name = name;
       this.id = id;
       this.ref = ref;
       this.isSetToAssign = isSetToAssign;

    }
}


export class ShuttleStructure {
    inGroup: ShuttleData[];
    notInGroup: ShuttleData[];

    constructor(inData: any , notInData: any, type: EditType  ) {

        this.inGroup = inData.map(d => {
            if (type === EditType.Applications) {
                const app = d as Applications;
                return new ShuttleData(app.applicationName, app.id, app);

            } else {
                const user = d as User;
                return new ShuttleData(user.username, user.userid, user);
            }


        });
        this.notInGroup = notInData.map(d => {
            if (type === EditType.Applications) {
                const app = d as Applications;
                return new ShuttleData(app.applicationName, app.id, app);

            } else {
                const user = d as User;
                return new ShuttleData(user.username, user.userid, user);
            }


        });

    }
}
