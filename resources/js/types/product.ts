import { Category } from './category';

export interface Product {
    id: number;
    name: string;
    price: number;
    category_id: number;
    category: Category | null;
}

export interface ProductsIndexPageProps {
    products: Product[];
    categories: Category[];
}
