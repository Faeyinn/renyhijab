import {
    ActionButtons,
    createDeleteAction,
    createEditAction,
} from '@/components/common/action-buttons';
import { DataTable } from '@/components/common/data-table';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { type Product } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { useState } from 'react';

interface ProductsTableProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export function ProductsTable({
    products,
    onEdit,
    onDelete,
}: ProductsTableProps) {
    const [productToDelete, setProductToDelete] = useState<Product | null>(
        null,
    );

    const handleDeleteConfirm = () => {
        if (productToDelete) {
            onDelete(productToDelete.id);
            setProductToDelete(null);
        }
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            className: 'font-medium text-stone-900',
        },
        {
            key: 'category',
            header: 'Category',
            className: 'text-stone-600',
            render: (product: Product) => (
                <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-orange-200/80 ring-inset">
                    {product.category?.name || '-'}
                </span>
            ),
        },
        {
            key: 'price',
            header: 'Price',
            className: 'text-stone-900 font-medium',
            render: (product: Product) => formatCurrency(product.price),
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-right',
            render: (product: Product) => (
                <ActionButtons
                    actions={[
                        createEditAction(() => onEdit(product)),
                        createDeleteAction(() => setProductToDelete(product)),
                    ]}
                />
            ),
        },
    ];

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
                <DataTable
                    data={products}
                    columns={columns}
                    emptyMessage="No products found."
                />
            </div>

            <AlertDialog
                open={!!productToDelete}
                onOpenChange={(open) => !open && setProductToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the product
                            <span className="font-semibold text-stone-900">
                                {' '}
                                {productToDelete?.name}
                            </span>{' '}
                            and remove its data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
