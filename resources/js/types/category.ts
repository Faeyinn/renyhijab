import { Product } from './product';

export interface Category {
    id: number;
    name: string;
    products_count: number;
    products?: Product[];
    created_at: string;
    updated_at: string;
}

export interface CategoriesIndexPageProps {
    categories: Category[];
}
