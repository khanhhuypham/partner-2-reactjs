import { GENDER } from "../../constants/enum";
import { Place } from "../place/place";
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


export class CustomerDetailData {
    id: number = 0;
    lead_id: number = 0;
    lead:CustomerDetail = new CustomerDetail()
}


export class CustomerDetail {

    id: number = 0;
    name: string = "";
    birthday: string = "";
    gender: GENDER = GENDER.male;
    phone: string = "";
    email: string = "";
    street: string = "";
    ward:Place = new Place();
    district:Place = new Place();
    city:Place = new Place();
    lead_source_id: number = 0;
    is_priority: number = 0;
    note: string = "";
    tags: TagEntity[] = [];
    // lead_groups: string = "";

    constructor(data?: Partial<CustomerDetail>) {
        Object.assign(this, data);
    }
}