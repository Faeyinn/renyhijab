import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { PageHeader } from '@/components/common/page-header';
import { NoCategoriesAlert } from '@/components/products/no-categories-alert';
import { ProductFormDialog } from '@/components/products/product-form-dialog';
import { ProductsTable } from '@/components/products/products-table';
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type Product,
    type ProductsIndexPageProps,
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Products',
        href: '/products',
    },
];

export default function ProductsIndex({
    products,
    categories,
}: ProductsIndexPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        name: '',
        price: '',
        category_id: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                toast.success('Product Created', {
                    description: 'The product has been successfully added.',
                });
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;
        put(`/products/${editingProduct.id}`, {
            onSuccess: () => {
                setEditingProduct(null);
                reset();
                toast.success('Product Updated', {
                    description: 'The product has been successfully updated.',
                });
            },
        });
    };

    const handleDelete = (id: number) => {
        destroy(`/products/${id}`, {
            onSuccess: () => {
                toast.success('Product Deleted', {
                    description: 'The product has been successfully removed.',
                });
            },
        });
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            price: product.price.toString(),
            category_id: product.category_id.toString(),
        });
    };

    const handleCreateDialogOpen = () => {
        reset();
        setIsCreateOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <NoCategoriesAlert categoriesCount={categories.length} />

                <PageHeader
                    title="Products"
                    action={{
                        label: 'Add Product',
                        disabled: categories.length === 0,
                        onClick: handleCreateDialogOpen,
                    }}
                />

                <ProductsTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <ProductFormDialog
                    isOpen={isCreateOpen}
                    onOpenChange={setIsCreateOpen}
                    editingProduct={null}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    categories={categories}
                    onSubmit={handleCreate}
                />

                <ProductFormDialog
                    isOpen={!!editingProduct}
                    onOpenChange={(open) => !open && setEditingProduct(null)}
                    editingProduct={editingProduct}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    categories={categories}
                    onSubmit={handleUpdate}
                />
            </div>
        </AppLayout>
    );
}
