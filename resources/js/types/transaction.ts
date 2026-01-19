import { Customer } from './customer';
import { Product } from './product';

export interface Detail {
    id: number;
    product: Product;
    quantity: number;
    price: number;
}

export interface Transaction {
    id: number;
    date: string;
    payment_method: string;
    payment_date: string;
    customer: Customer;
    details: Detail[];
    created_at: string;
    total: number;
    [key: string]: unknown;
}

export interface TransactionPageProps {
    transaction: Transaction;
}

export interface TransactionsIndexPageProps {
    transactions: Transaction[];
    customers: Customer[];
    products: Product[];
}

export interface TransactionDetail {
    product_id: string;
    quantity: number;
    price: number;
    total: number;
}

export interface TransactionCreatePageProps {
    customers: Customer[];
    products: Product[];
}
