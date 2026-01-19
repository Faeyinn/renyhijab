// Common types
export type { ActionButton, BreadcrumbItem, Column, FormField } from './common';
export type { Auth, NavGroup, NavItem, SharedData, User } from './index.d';

// Domain types
export type { DashboardPageProps, RecentTransaction, Stats } from './dashboard';

export type {
    Detail,
    Transaction,
    TransactionCreatePageProps,
    TransactionDetail,
    TransactionPageProps,
    TransactionsIndexPageProps,
} from './transaction';

export type { CategoriesIndexPageProps, Category } from './category';
export type { Product, ProductsIndexPageProps } from './product';

export type { Customer, CustomersIndexPageProps } from './customer';
