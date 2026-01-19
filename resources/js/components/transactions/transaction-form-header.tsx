import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type Customer } from '@/types';

interface TransactionFormHeaderProps {
    data: {
        date: string;
        customer_id: string;
        payment_method: string;
        payment_date: string;
    };
    setData: (field: string, value: string) => void;
    errors: Record<string, string>;
    customers: Customer[];
}

export function TransactionFormHeader({
    data,
    setData,
    errors,
    customers,
}: TransactionFormHeaderProps) {
    return (
        <div className="rounded-xl border border-rose-100 bg-white p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="date" className="text-stone-700">
                        Date
                    </Label>
                    <Input
                        id="date"
                        type="date"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        className="border-rose-200 transition-colors focus:border-rose-400 focus:ring-rose-400"
                    />
                    {errors.date && (
                        <p className="text-sm text-red-500">{errors.date}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customer" className="text-stone-700">
                        Customer
                    </Label>
                    <Select
                        value={data.customer_id}
                        onValueChange={(value) => setData('customer_id', value)}
                    >
                        <SelectTrigger className="border-rose-200 transition-colors focus:border-rose-400 focus:ring-rose-400">
                            <SelectValue placeholder="Select Customer" />
                        </SelectTrigger>
                        <SelectContent>
                            {customers.map((c) => (
                                <SelectItem key={c.id} value={c.id.toString()}>
                                    {c.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.customer_id && (
                        <p className="text-sm text-red-500">
                            {errors.customer_id}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="payment_method" className="text-stone-700">
                        Payment Method
                    </Label>
                    <Select
                        value={data.payment_method}
                        onValueChange={(value) =>
                            setData('payment_method', value)
                        }
                    >
                        <SelectTrigger className="border-rose-200 transition-colors focus:border-rose-400 focus:ring-rose-400">
                            <SelectValue placeholder="Select Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cash">Cash</SelectItem>
                            <SelectItem value="Transfer">Transfer</SelectItem>
                            <SelectItem value="Credit Card">
                                Credit Card
                            </SelectItem>
                            <SelectItem value="E-Wallet">E-Wallet</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.payment_method && (
                        <p className="text-sm text-red-500">
                            {errors.payment_method}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="payment_date" className="text-stone-700">
                        Payment Date
                    </Label>
                    <Input
                        id="payment_date"
                        type="date"
                        value={data.payment_date}
                        onChange={(e) =>
                            setData('payment_date', e.target.value)
                        }
                        className="border-rose-200 transition-colors focus:border-rose-400 focus:ring-rose-400"
                    />
                    {errors.payment_date && (
                        <p className="text-sm text-red-500">
                            {errors.payment_date}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
