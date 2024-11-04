export class CustomerSource{
  id: number = 0;
  name: string = "";
  created_at: string = "";
  description: string = "";
  status: number = 0;
  lead_count: number = 0;
  customer_count: number = 0;
  updated_at: string = "";
  constructor(data?: Partial<CustomerSource>) {
    Object.assign(this, data);
  }
}