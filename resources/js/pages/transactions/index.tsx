import { Head, useForm } from '@inertiajs/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { PageHeader } from '@/components/common/page-header';
import { TransactionsTable } from '@/components/transactions/transactions-table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import {
    type BreadcrumbItem,
    type TransactionDetail,
    type TransactionsIndexPageProps,
} from '@/types';
import { formatCurrency } from '@/utils/currency';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

export default function TransactionsIndex({
    transactions,
    customers,
    products,
}: TransactionsIndexPageProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        customer_id: '',
        date: new Date().toISOString().split('T')[0],
        payment_method: '',
        payment_date: new Date().toISOString().split('T')[0],
        details: [] as TransactionDetail[],
    });

    const addProduct = () => {
        setData('details', [
            ...data.details,
            { product_id: '', quantity: 1, price: 0, total: 0 },
        ]);
    };

    const removeProduct = (index: number) => {
        const newDetails = [...data.details];
        newDetails.splice(index, 1);
        setData('details', newDetails);
    };

    const updateDetail = (
        index: number,
        field: keyof TransactionDetail,
        value: string | number,
    ) => {
        const newDetails = [...data.details];
        const detail = newDetails[index];

        if (field === 'product_id') {
            const valStr = value.toString();
            const product = products.find((p) => p.id.toString() === valStr);
            detail.product_id = valStr;
            detail.price = product ? Number(product.price) : 0;
        } else if (field === 'quantity') {
            detail.quantity = Number(value);
        }

        detail.total = detail.price * detail.quantity;
        newDetails[index] = detail;
        setData('details', newDetails);
    };

    const grandTotal = data.details.reduce((sum, item) => sum + item.total, 0);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions', {
            onSuccess: () => {
                setIsCreateOpen(false);
                reset();
                toast.success('Transaction Completed', {
                    description:
                        'The transaction has been successfully recorded.',
                });
            },
        });
    };

    const handleDelete = (id: number) => {
        destroy(`/transactions/${id}`, {
            onSuccess: () => {
                toast.success('Transaction Deleted', {
                    description:
                        'The transaction has been successfully removed.',
                });
            },
        });
    };

    const handleOpenCreate = () => {
        reset();
        setIsCreateOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <PageHeader
                    title="Transactions"
                    action={{
                        label: 'New Transaction',
                        onClick: handleOpenCreate,
                    }}
                />
                <TransactionsTable
                    transactions={transactions}
                    onDelete={handleDelete}
                />
            </div>

            {/* Create Transaction Modal */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="flex max-h-[85vh] max-w-xl flex-col gap-0 overflow-hidden rounded-xl border-0 bg-white p-0 shadow-2xl">
                    {/* Header */}
                    <div className="shrink-0 bg-rose-800 px-6 py-4 pr-12">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-white">
                                New Transaction
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    {/* Form Content */}
                    <form
                        onSubmit={handleCreate}
                        className="flex flex-1 flex-col overflow-hidden"
                    >
                        <div className="flex-1 space-y-5 overflow-y-auto p-5">
                            {/* Transaction Info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="mb-1.5 block text-xs font-medium text-stone-600">
                                        Customer
                                    </Label>
                                    <Select
                                        value={data.customer_id}
                                        onValueChange={(value) =>
                                            setData('customer_id', value)
                                        }
                                    >
                                        <SelectTrigger className="h-9 w-full border-stone-300 text-sm">
                                            <SelectValue placeholder="Select customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map((c) => (
                                                <SelectItem
                                                    key={c.id}
                                                    value={c.id.toString()}
                                                >
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.customer_id && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.customer_id}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label className="mb-1.5 block text-xs font-medium text-stone-600">
                                        Date
                                    </Label>
                                    <Input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData('date', e.target.value)
                                        }
                                        className="h-9 border-stone-300 text-sm"
                                    />
                                </div>
                                <div>
                                    <Label className="mb-1.5 block text-xs font-medium text-stone-600">
                                        Payment Method
                                    </Label>
                                    <Select
                                        value={data.payment_method}
                                        onValueChange={(value) =>
                                            setData('payment_method', value)
                                        }
                                    >
                                        <SelectTrigger className="h-9 w-full border-stone-300 text-sm">
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Cash">
                                                Cash
                                            </SelectItem>
                                            <SelectItem value="Transfer">
                                                Transfer
                                            </SelectItem>
                                            <SelectItem value="Credit Card">
                                                Credit Card
                                            </SelectItem>
                                            <SelectItem value="E-Wallet">
                                                E-Wallet
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className="mb-1.5 block text-xs font-medium text-stone-600">
                                        Payment Date
                                    </Label>
                                    <Input
                                        type="date"
                                        value={data.payment_date}
                                        onChange={(e) =>
                                            setData(
                                                'payment_date',
                                                e.target.value,
                                            )
                                        }
                                        className="h-9 border-stone-300 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Items Section */}
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <Label className="text-sm font-semibold text-stone-900">
                                        Items
                                    </Label>
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={addProduct}
                                        className="h-7 bg-rose-700 px-2.5 text-xs text-white hover:bg-rose-800"
                                    >
                                        <Plus className="mr-1 h-3.5 w-3.5" />
                                        Add
                                    </Button>
                                </div>

                                {errors.details && (
                                    <p className="mb-2 text-xs text-red-500">
                                        {errors.details}
                                    </p>
                                )}

                                {data.details.length === 0 ? (
                                    <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 py-8 text-center">
                                        <p className="text-sm text-stone-400">
                                            No items added yet
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {data.details.map((detail, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg border border-stone-200 bg-stone-50 p-3"
                                            >
                                                {/* Product Row */}
                                                <div className="mb-2 flex items-center gap-3">
                                                    <div className="flex-1">
                                                        <Select
                                                            value={
                                                                detail.product_id
                                                            }
                                                            onValueChange={(
                                                                value,
                                                            ) =>
                                                                updateDetail(
                                                                    index,
                                                                    'product_id',
                                                                    value,
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger className="h-9 w-full border-stone-300 bg-white text-sm">
                                                                <SelectValue placeholder="Select product" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {products.map(
                                                                    (p) => (
                                                                        <SelectItem
                                                                            key={
                                                                                p.id
                                                                            }
                                                                            value={p.id.toString()}
                                                                        >
                                                                            {
                                                                                p.name
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 shrink-0 text-stone-400 hover:bg-red-50 hover:text-red-600"
                                                        onClick={() =>
                                                            removeProduct(index)
                                                        }
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                {/* Qty, Price, Subtotal Row */}
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-stone-500">
                                                            Qty:
                                                        </span>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                detail.quantity
                                                            }
                                                            onChange={(e) =>
                                                                updateDetail(
                                                                    index,
                                                                    'quantity',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-8 w-16 border-stone-300 bg-white text-center text-sm"
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-stone-500">
                                                            Price:
                                                        </span>
                                                        <span className="text-sm text-stone-700">
                                                            {formatCurrency(
                                                                detail.price,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1 text-right">
                                                        <span className="text-sm font-semibold text-rose-700">
                                                            {formatCurrency(
                                                                detail.total,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="shrink-0 border-t border-stone-200 bg-stone-50 px-5 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-stone-500">
                                        Total
                                    </p>
                                    <p className="text-xl font-bold text-rose-700">
                                        {formatCurrency(grandTotal)}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsCreateOpen(false)}
                                        className="border-stone-300 text-stone-600"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        disabled={
                                            processing ||
                                            data.details.length === 0
                                        }
                                        className="bg-rose-700 text-white hover:bg-rose-800"
                                    >
                                        Complete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
