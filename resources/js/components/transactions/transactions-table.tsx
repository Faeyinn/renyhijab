import {
    ActionButtons,
    createDeleteAction,
    createViewAction,
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
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { type Transaction } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { Printer } from 'lucide-react';
import { useState } from 'react';

interface TransactionsTableProps {
    transactions: Transaction[];
    onDelete: (id: number) => void;
}

export function TransactionsTable({
    transactions,
    onDelete,
}: TransactionsTableProps) {
    const [transactionToDelete, setTransactionToDelete] =
        useState<Transaction | null>(null);
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);

    const handleDeleteConfirm = () => {
        if (transactionToDelete) {
            onDelete(transactionToDelete.id);
            setTransactionToDelete(null);
        }
    };

    const columns = [
        {
            key: 'id',
            header: 'Invoice ID',
            className: 'font-mono text-xs text-stone-500',
            render: (transaction: Transaction) => `#${transaction.id}`,
        },
        {
            key: 'date',
            header: 'Date',
            className: 'text-stone-500 text-sm',
        },
        {
            key: 'customer',
            header: 'Customer',
            className: 'font-medium text-stone-900',
            render: (transaction: Transaction) =>
                transaction.customer?.name || '-',
        },
        {
            key: 'total',
            header: 'Total',
            className: 'text-right font-medium text-stone-900',
            render: (transaction: Transaction) =>
                formatCurrency(transaction.total),
        },
        {
            key: 'actions',
            header: 'Actions',
            className: 'text-right',
            render: (transaction: Transaction) => (
                <ActionButtons
                    actions={[
                        createViewAction(() =>
                            setSelectedTransaction(transaction),
                        ),
                        createDeleteAction(() =>
                            setTransactionToDelete(transaction),
                        ),
                    ]}
                />
            ),
        },
    ];

    return (
        <>
            <div className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
                <DataTable
                    data={transactions}
                    columns={columns}
                    emptyMessage="No transactions found."
                />
            </div>

            {/* View Transaction Details Modal */}
            <Dialog
                open={!!selectedTransaction}
                onOpenChange={(open) => !open && setSelectedTransaction(null)}
            >
                <DialogContent className="max-w-2xl gap-0 overflow-hidden rounded-xl border border-stone-200 bg-white p-0 shadow-xl">
                    {selectedTransaction && (
                        <>
                            {/* Header */}
                            <div className="bg-gradient-to-r from-rose-800 to-rose-700 px-6 py-4 pr-14">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <DialogTitle className="text-lg font-bold text-white">
                                            Invoice #{selectedTransaction.id}
                                        </DialogTitle>
                                        <p className="mt-0.5 text-xs text-rose-200">
                                            {selectedTransaction.date}
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => window.print()}
                                        className="h-8 border-0 bg-white/20 px-3 text-xs text-white hover:bg-white/30"
                                    >
                                        <Printer className="mr-1.5 h-3.5 w-3.5" />{' '}
                                        Print
                                    </Button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="max-h-[65vh] overflow-y-auto p-6">
                                {/* Info Cards */}
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    <div className="rounded-lg bg-stone-50 p-4">
                                        <p className="mb-1 text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                                            Customer
                                        </p>
                                        <p className="font-semibold text-stone-900">
                                            {selectedTransaction.customer.name}
                                        </p>
                                    </div>
                                    <div className="rounded-lg bg-stone-50 p-4">
                                        <p className="mb-1 text-[10px] font-bold tracking-wider text-stone-400 uppercase">
                                            Payment
                                        </p>
                                        <p className="font-semibold text-stone-900">
                                            {(selectedTransaction.payment_method as string) ||
                                                'N/A'}
                                        </p>
                                        <p className="mt-0.5 text-xs text-stone-500">
                                            Paid:{' '}
                                            {(selectedTransaction.payment_date as string) ||
                                                '-'}
                                        </p>
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div className="overflow-hidden rounded-lg border border-stone-200">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-stone-200 bg-stone-50">
                                                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-600">
                                                    Product
                                                </th>
                                                <th className="w-16 px-4 py-3 text-center text-xs font-semibold text-stone-600">
                                                    Qty
                                                </th>
                                                <th className="w-28 px-4 py-3 text-right text-xs font-semibold text-stone-600">
                                                    Price
                                                </th>
                                                <th className="w-28 px-4 py-3 text-right text-xs font-semibold text-stone-600">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-100">
                                            {selectedTransaction.details?.map(
                                                (detail) => (
                                                    <tr
                                                        key={detail.id}
                                                        className="hover:bg-stone-50/50"
                                                    >
                                                        <td className="px-4 py-3 font-medium text-stone-900">
                                                            {
                                                                detail.product
                                                                    .name
                                                            }
                                                        </td>
                                                        <td className="px-4 py-3 text-center text-stone-600">
                                                            {detail.quantity}
                                                        </td>
                                                        <td className="px-4 py-3 text-right text-stone-600">
                                                            {formatCurrency(
                                                                Number(
                                                                    detail.price,
                                                                ),
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 text-right font-semibold text-stone-900">
                                                            {formatCurrency(
                                                                Number(
                                                                    detail.price,
                                                                ) *
                                                                    Number(
                                                                        detail.quantity,
                                                                    ),
                                                            )}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Total */}
                                <div className="mt-4 flex justify-end">
                                    <div className="rounded-lg border border-rose-200 bg-rose-50 px-6 py-4 text-right">
                                        <p className="mb-1 text-xs font-medium text-rose-700">
                                            Grand Total
                                        </p>
                                        <p className="text-2xl font-bold text-rose-800">
                                            {formatCurrency(
                                                selectedTransaction.total,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-stone-200 bg-stone-50 px-6 py-3">
                                <p className="text-center text-xs text-stone-400">
                                    <span className="font-semibold text-stone-500">
                                        Renyhijab
                                    </span>{' '}
                                    • Thank you for your purchase
                                </p>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Alert */}
            <AlertDialog
                open={!!transactionToDelete}
                onOpenChange={(open) => !open && setTransactionToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the transaction
                            <span className="font-semibold text-stone-900">
                                {' '}
                                #{transactionToDelete?.id}
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
