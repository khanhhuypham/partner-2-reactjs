import { TagEntity } from "./tag";

export class CustomerPage {
    limit: number = 0;
    list: Array<Customer> = [];
    total_record: number = 0

    constructor(data?: Partial<CustomerPage>) {
        Object.assign(this, data);
    }
}

export class Customer {
    created_at: string = "";
    updated_at: string = "";
    id: number = 0;
    // company_id: number = 0;
    lead_id: number = 0;
    tags: TagEntity[] = [];
    lead_source_name: string = "";
    customer_name: string = "";
    customer_phone: string = "";
    // is_priority: number = 0;
    // note: string = "";

    constructor(data?: Partial<Customer>) {
        Object.assign(this, data);
    }
}

