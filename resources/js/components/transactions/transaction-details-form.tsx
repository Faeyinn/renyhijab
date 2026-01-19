import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { type Product, type TransactionDetail } from '@/types';
import { formatCurrency } from '@/utils/currency';

import { TransactionItemRow } from './transaction-item-row';

interface TransactionDetailsFormProps {
    details: TransactionDetail[];
    products: Product[];
    errors: Record<string, string>;
    onAddItem: () => void;
    onUpdateItem: (
        index: number,
        field: keyof TransactionDetail,
        value: string | number,
    ) => void;
    onRemoveItem: (index: number) => void;
}

export function TransactionDetailsForm({
    details,
    products,
    errors,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
}: TransactionDetailsFormProps) {
    const grandTotal = details.reduce(
        (sum: number, item: TransactionDetail) => sum + item.total,
        0,
    );

    return (
        <div className="space-y-4 rounded-xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-rose-900">
                    Transaction Details
                </h2>
                <Button
                    type="button"
                    onClick={onAddItem}
                    variant="outline"
                    size="sm"
                    className="border-rose-200 text-rose-700 hover:bg-rose-50"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </div>

            {errors.details && (
                <p className="text-sm text-red-500">{errors.details}</p>
            )}

            <div className="space-y-4">
                {details.map((detail, index) => (
                    <TransactionItemRow
                        key={index}
                        detail={detail}
                        index={index}
                        products={products}
                        errors={errors}
                        onUpdate={onUpdateItem}
                        onRemove={onRemoveItem}
                    />
                ))}
                {details.length === 0 && (
                    <p className="py-8 text-center text-stone-500">
                        No items added yet.
                    </p>
                )}
            </div>

            {details.length > 0 && (
                <div className="flex justify-end border-t border-rose-100 pt-4">
                    <div className="text-right">
                        <span className="mr-4 text-stone-600">
                            Grand Total:
                        </span>
                        <span className="text-2xl font-bold text-rose-700">
                            {formatCurrency(grandTotal)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
