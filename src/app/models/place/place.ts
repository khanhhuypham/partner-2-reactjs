export class Place {
    id: number = 0;
    name: string = "";
 
    constructor(item?: Partial<Place>) {
        Object.assign(this, item);
    }
}