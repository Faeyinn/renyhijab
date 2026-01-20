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
import { type Customer } from '@/types';

interface CustomersTableProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    onDelete: (id: number) => void;
}

export function CustomersTable({
    customers,
    onEdit,
    onDelete,
}: CustomersTableProps) {
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
        null,
    );

    const handleDeleteConfirm = () => {
        if (customerToDelete) {
            onDelete(customerToDelete.id);
            setCustomerToDelete(null);
        }
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            className: 'font-medium text-stone-900',
        },
        {
            key: 'phone',
            header: 'Phone',
            className: 'font-mono text-sm text-stone-500',
        },
        {
            key: 'address',
            header: 'Address',
            className: 'text-stone-600 max-w-[300px] truncate',
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-right',
            render: (customer: Customer) => (
                <ActionButtons
                    actions={[
                        createEditAction(() => onEdit(customer)),
                        createDeleteAction(() => setCustomerToDelete(customer)),
                    ]}
                />
            ),
        },
    ];

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
                <DataTable
                    data={customers}
                    columns={columns}
                    emptyMessage="No customers found."
                />
            </div>

            <AlertDialog
                open={!!customerToDelete}
                onOpenChange={(open) => !open && setCustomerToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the customer
                            <span className="font-semibold text-stone-900">
                                {' '}
                                {customerToDelete?.name}
                            </span>{' '}
                            and remove their data from our servers.
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
