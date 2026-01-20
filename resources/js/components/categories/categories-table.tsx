import { ChevronRight, Info } from 'lucide-react';
import { useState } from 'react';

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
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { type Category } from '@/types';

interface CategoriesTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

export function CategoriesTable({
    categories,
    onEdit,
    onDelete,
}: CategoriesTableProps) {
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
        null,
    );

    const handleDeleteConfirm = () => {
        if (categoryToDelete) {
            onDelete(categoryToDelete.id);
            setCategoryToDelete(null);
        }
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            className: 'font-medium text-stone-900 w-1/3',
        },
        {
            key: 'products_count',
            header: 'Products',
            className: 'text-stone-600 w-1/3',
            render: (category: Category) => (
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-800 ring-1 ring-red-200/80 ring-inset">
                        {category.products_count} Products
                    </span>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="group h-7 w-7 rounded-full hover:bg-red-50 hover:text-red-900"
                            >
                                <Info className="h-4 w-4 text-stone-400 transition-colors group-hover:text-red-600" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-64 overflow-hidden rounded-xl border-red-100 p-0 shadow-xl"
                            align="start"
                        >
                            <div className="border-b border-red-800 bg-red-900 px-4 py-2">
                                <h4 className="text-xs font-bold tracking-widest text-red-100 uppercase">
                                    Products in {category.name}
                                </h4>
                            </div>
                            <div className="max-h-[240px] overflow-y-auto">
                                {category.products &&
                                category.products.length > 0 ? (
                                    <ul className="divide-y divide-stone-100">
                                        {category.products.map((product) => (
                                            <li
                                                key={product.id}
                                                className="px-4 py-2 transition-colors hover:bg-stone-50"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium text-stone-700">
                                                        {product.name}
                                                    </span>
                                                    <ChevronRight className="h-3 w-3 text-stone-300" />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="px-4 py-6 text-center">
                                        <p className="text-xs text-stone-400">
                                            No products found in this category.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-right w-1/3',
            render: (category: Category) => (
                <ActionButtons
                    actions={[
                        createEditAction(() => onEdit(category)),
                        createDeleteAction(() => setCategoryToDelete(category)),
                    ]}
                />
            ),
        },
    ];

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-red-50 bg-white shadow-sm">
                <DataTable
                    data={categories}
                    columns={columns}
                    emptyMessage="No categories found."
                />
            </div>

            <AlertDialog
                open={!!categoryToDelete}
                onOpenChange={(open) => !open && setCategoryToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the category
                            <span className="font-semibold text-stone-900">
                                {' '}
                                {categoryToDelete?.name}
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
