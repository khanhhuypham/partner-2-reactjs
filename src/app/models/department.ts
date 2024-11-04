import { Personnel } from "./personnel"




export class Department {
    id: number = 0
    name: string = ""
    parent_department_id: number = 0
    parent_department_name: string = ""
    company_id: number = 0
    user_count: number = 0
    status: number = 0
    description: string = ""
    source_color: string = ""
    created_at: string = ""
    updated_at: string = ""
    users: Personnel[] = []

    constructor(item?: Partial<Department>) {
        Object.assign(this, item)
    }
}





export class DepartmentTree {
    id: number = 0;
    name: string = "";
    parent_department_id: number = 0;
    parent_department_name: string = "";
    company_id: number = 0;
    user_count: number = 0;
    status: number = 0;
    description: string = "";
    source_color: string = "";
    created_at: string = "";
    updated_at: string = "";
    children: DepartmentTree[] = []; 

    constructor(item?: Partial<DepartmentTree>) {
        Object.assign(this, item);
    }
}