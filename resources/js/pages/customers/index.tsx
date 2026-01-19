import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

import { PageHeader } from '@/components/common/page-header';
import { SimpleFormDialog } from '@/components/common/simple-form-dialog';
import { CustomersTable } from '@/components/customers/customers-table';
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type Customer,
    type CustomersIndexPageProps,
} from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Customers',
        href: '/customers',
    },
];

export default function CustomersIndex({ customers }: CustomersIndexPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(
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
        phone: '',
        address: '',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/customers', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                toast.success('Customer Created', {
                    description: 'The customer has been successfully added.',
                });
            },
        });
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCustomer) return;
        put(`/customers/${editingCustomer.id}`, {
            onSuccess: () => {
                setEditingCustomer(null);
                reset();
                toast.success('Customer Updated', {
                    description: 'The customer has been successfully updated.',
                });
            },
        });
    };

    const handleDelete = (id: number) => {
        destroy(`/customers/${id}`, {
            onSuccess: () => {
                toast.success('Customer Deleted', {
                    description: 'The customer has been successfully removed.',
                });
            },
        });
    };

    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setData({
            name: customer.name,
            phone: customer.phone || '',
            address: customer.address || '',
        });
    };

    const handleCreateDialogOpen = () => {
        reset();
        setIsCreateOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <PageHeader
                    title="Customers"
                    action={{
                        label: 'Add Customer',
                        onClick: handleCreateDialogOpen,
                    }}
                />

                <CustomersTable
                    customers={customers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <SimpleFormDialog
                    isOpen={isCreateOpen}
                    onOpenChange={setIsCreateOpen}
                    title="Add Customer"
                    description="Create a new customer."
                    fields={[
                        {
                            name: 'name',
                            label: 'Name',
                            placeholder: 'Enter customer name',
                        },
                        {
                            name: 'phone',
                            label: 'Phone',
                            placeholder: 'Enter phone number',
                        },
                        {
                            name: 'address',
                            label: 'Address',
                            placeholder: 'Enter address',
                            type: 'textarea',
                        },
                    ]}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreate}
                />

                <SimpleFormDialog
                    isOpen={!!editingCustomer}
                    onOpenChange={(open) => !open && setEditingCustomer(null)}
                    title="Edit Customer"
                    fields={[
                        {
                            name: 'name',
                            label: 'Name',
                            placeholder: 'Enter customer name',
                        },
                        {
                            name: 'phone',
                            label: 'Phone',
                            placeholder: 'Enter phone number',
                        },
                        {
                            name: 'address',
                            label: 'Address',
                            placeholder: 'Enter address',
                            type: 'textarea',
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
