export interface Customer {
    id: number;
    name: string;
    phone: string;
    address: string;
    transactions_count: number;
}

export interface CustomersIndexPageProps {
    customers: Customer[];
}
