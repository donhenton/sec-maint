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
    INITIAL, ADD, EDIT, DELETE

}
