import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type Product, type TransactionDetail } from '@/types';
import { formatCurrency } from '@/utils/currency';

interface TransactionItemRowProps {
    detail: TransactionDetail;
    index: number;
    products: Product[];
    errors: Record<string, string>;
    onUpdate: (
        index: number,
        field: keyof TransactionDetail,
        value: string | number,
    ) => void;
    onRemove: (index: number) => void;
}

export function TransactionItemRow({
    detail,
    index,
    products,
    errors,
    onUpdate,
    onRemove,
}: TransactionItemRowProps) {
    return (
        <div className="grid grid-cols-12 items-end gap-4 border-b border-rose-100 pb-4 last:border-0 last:pb-0">
            <div className="col-span-12 space-y-2 md:col-span-5">
                <Label className="text-stone-600">Product</Label>
                <Select
                    value={detail.product_id}
                    onValueChange={(value) =>
                        onUpdate(index, 'product_id', value)
                    }
                >
                    <SelectTrigger className="border-rose-200 focus:ring-rose-500">
                        <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                        {products.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                                {p.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors[`details.${index}.product_id`] && (
                    <p className="text-sm text-red-500">
                        {errors[`details.${index}.product_id`]}
                    </p>
                )}
            </div>
            <div className="col-span-12 space-y-2 md:col-span-2">
                <Label className="text-stone-600">Price</Label>
                <div className="flex h-10 items-center rounded-md border border-rose-200 bg-rose-50/50 px-3 text-sm text-stone-600">
                    {formatCurrency(detail.price)}
                </div>
            </div>
            <div className="col-span-12 space-y-2 md:col-span-2">
                <Label className="text-stone-600">Quantity</Label>
                <Input
                    type="number"
                    min="1"
                    value={detail.quantity}
                    onChange={(e) =>
                        onUpdate(index, 'quantity', e.target.value)
                    }
                    className="border-rose-200 focus-visible:ring-rose-500"
                />
                {errors[`details.${index}.quantity`] && (
                    <p className="text-sm text-red-500">
                        {errors[`details.${index}.quantity`]}
                    </p>
                )}
            </div>
            <div className="col-span-12 space-y-2 md:col-span-2">
                <Label className="text-stone-600">Total</Label>
                <div className="flex h-10 items-center rounded-md border border-rose-200 bg-rose-50 px-3 text-sm font-medium text-rose-700">
                    {formatCurrency(detail.total)}
                </div>
            </div>
            <div className="col-span-12 text-right md:col-span-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => onRemove(index)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
