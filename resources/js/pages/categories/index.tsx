import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { CategoriesTable } from '@/components/categories/categories-table';
import { PageHeader } from '@/components/common/page-header';
import { SimpleFormDialog } from '@/components/common/simple-form-dialog';
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type CategoriesIndexPageProps,
    type Category,
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function CategoriesIndex({
    categories,
}: CategoriesIndexPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );

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
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/categories', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                toast.success('Category Created', {
                    description: 'The category has been successfully added.',
                });
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;
        put(`/categories/${editingCategory.id}`, {
            onSuccess: () => {
                setEditingCategory(null);
                reset();
                toast.success('Category Updated', {
                    description: 'The category has been successfully updated.',
                });
            },
        });
    };

    const handleDelete = (id: number) => {
        destroy(`/categories/${id}`, {
            onSuccess: () => {
                toast.success('Category Deleted', {
                    description: 'The category has been successfully removed.',
                });
            },
        });
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setData('name', category.name);
    };

    const handleCreateDialogOpen = () => {
        reset();
        setIsCreateOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <PageHeader
                    title="Categories"
                    action={{
                        label: 'Add Category',
                        onClick: handleCreateDialogOpen,
                    }}
                />

                <CategoriesTable
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <SimpleFormDialog
                    isOpen={isCreateOpen}
                    onOpenChange={setIsCreateOpen}
                    title="Add Category"
                    description="Create a new category for your products."
                    fields={[
                        {
                            name: 'name',
                            label: 'Name',
                            placeholder: 'Enter category name',
                        },
                    ]}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreate}
                />

                <SimpleFormDialog
                    isOpen={!!editingCategory}
                    onOpenChange={(open) => !open && setEditingCategory(null)}
                    title="Edit Category"
                    fields={[
                        {
                            name: 'name',
                            label: 'Name',
                            placeholder: 'Enter category name',
                        },
                    ]}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleUpdate}
                    submitLabel="Update"
                />
            </div>
        </AppLayout>
    );
}
