import { type Customer } from '@/types';

interface InvoiceDetailsProps {
    customer: Customer;
    date: string;
    paymentDate?: string;
    paymentMethod?: string;
}

export function InvoiceDetails({
    customer,
    date,
    paymentDate,
    paymentMethod,
}: InvoiceDetailsProps) {
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
                <h3 className="mb-2 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                    Customer Information
                </h3>
                <p className="text-xl font-bold text-stone-900">
                    {customer.name}
                </p>
                <p className="mt-1 text-sm text-stone-500">Verified Customer</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h3 className="mb-1 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                        Issue Date
                    </h3>
                    <p className="text-sm font-semibold text-stone-700">
                        {date}
                    </p>
                </div>
                <div>
                    <h3 className="mb-1 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                        Method
                    </h3>
                    <p className="text-sm font-semibold text-stone-700">
                        {paymentMethod || '-'}
                    </p>
                </div>
                <div className="col-span-2">
                    <h3 className="mb-1 text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                        Payment Date
                    </h3>
                    <p className="text-sm font-semibold text-stone-700">
                        {paymentDate || '-'}
                    </p>
                </div>
            </div>
        </div>
    );
}
