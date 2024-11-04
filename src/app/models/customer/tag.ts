export class TagEntity {
    id: number = 0;
    company_id: number = 0;
    name: string = "";
    description: string = "";
    color: string = "";
    status: number = 0;
    lead_count: number = 0;
    customer_count: number = 0;
    created_at: string = "";
    updated_at: string = "";
    search_value_normalized: string = "";

    constructor(data?: Partial<TagEntity>) {
        Object.assign(this, data);
    }
}
