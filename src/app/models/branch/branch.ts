export class Branch {
    id: number = 0;
    name: string = "";
    address: string = "";

    constructor(item?: Partial<Branch>) {
        Object.assign(this, item);
    }
}