import { Applications, User } from '../../services/security.interfaces';

export class SelectorData {

     name: string;
     id: number;
     ref: any;
     constructor(name: string, id: number, ref) {
        this.name = name;
        this.id = id;
        this.ref = ref;

     }
}

export enum EditState {
    INITIAL, ADD, EDIT, DELETE, FORM_SAVE, FORM_CANCEL

}

export class AppsUpdate {

    type: EditType;
    action: EditState;
    payload: any;

    constructor(type: EditType, action: EditState, payload: any ) {
       this.type = type;
       this.action = action;
       this.payload = payload;

    }

}

export class UsersUpdate {

    type: EditType;
    action: EditState;
    newUser: User;

    constructor(type: EditType, action: EditState, newUser: User ) {
       this.type = type;
       this.action = action;
       this.newUser = newUser;

    }

}

export enum EditType {
    Applications, Users
}
