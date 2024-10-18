export class User {
    id: number = 0;
    access_token: string = "";
    address: string = "";
    // avatar: Media = new Media();
    birthday: string = "";
    branch_id: number = 0;
    // branches: Branch[] = [];
    company_id: number = 0;
    department_id: number = 0;
    department_name: string = "";
    email: string = "";
    gender: number = 0;
    is_owner: number = 0;
    password: string = "";
    manager_id: number = 0;
    manager_name: string = "";
    name: string = "";
    phone: string = "";
    privilege_codes: string[] = []
    privilege_group_id: number = 0;
    status: number = 0;
    updated_at: string = "";
    created_at: string = "";
    joining_date: string = "";
    
    constructor(data?: Partial<User>) {
        Object.assign(this, data);
    }
}