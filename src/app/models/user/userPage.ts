import { User } from "./user";

export class UserPage {
    limit: number = 0;
    list: User[] = [];
    total_record: number = 0

    constructor(data?: Partial<UserPage>) {
        Object.assign(this, data);
    }
}