export class Personnel {
    created_at: string = "";
    updated_at: string = "";
    id: number = 0;
    company_id: number = 0;
    manager_id: number = 0;
    department_id: number = 0;
    privilege_group_id: number = 0;
    status: number = 0;
    name: string = "";
    phone: string = "";
    email: string = "";
    address: string = "";
    // avatar: Media = new Media()
    gender: number = 0;
    joining_date: string = "";
    birthday: string = "";
    is_owner: number = 0;
    department_name: string = "";
    // branches: Branch[] = []
    is_selected: number = 0;

    //////////////////////////////////// 
    member: number = 0;           //////
    // employees: Employee[] = []    //////
    personInCharge: string = ""   //////
    campaign_name: string = ""    ////// Chưa sửa model
    startDate: string = ""        //////
    endDate: string = ""          //////
    fieldName: string = ""        //////
    ////////////////////////////////////

    constructor(data?: Partial<Personnel>) {
        Object.assign(this, data);
    }
}

export class PersonnelList {
    limit: number = 0;
    list: Array<Personnel> = [];
    total_record: number = 0

    constructor(data?: Partial<PersonnelList>) {
        Object.assign(this, data);
    }
}
