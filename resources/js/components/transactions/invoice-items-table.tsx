import { type Detail } from '@/types';
import { formatCurrency } from '@/utils/currency';

interface InvoiceItemsTableProps {
    details: Detail[];
}

export function InvoiceItemsTable({ details }: InvoiceItemsTableProps) {
    const grandTotal = details.reduce(
        (sum: number, item: Detail) =>
            sum + Number(item.price) * Number(item.quantity),
        0,
    );

    return (
        <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-stone-200 bg-stone-50/50">
                        <th className="px-6 py-4 text-left text-[10px] font-bold tracking-wider text-stone-900 uppercase">
                            Description
                        </th>
                        <th className="w-24 px-6 py-4 text-center text-[10px] font-bold tracking-wider text-stone-900 uppercase">
                            Qty
                        </th>
                        <th className="w-32 px-6 py-4 text-right text-[10px] font-bold tracking-wider text-stone-900 uppercase">
                            Unit Price
                        </th>
                        <th className="w-32 px-6 py-4 text-right text-[10px] font-bold tracking-wider text-stone-900 uppercase">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                    {details.map((detail: Detail) => (
                        <tr
                            key={detail.id}
                            className="transition-colors hover:bg-stone-50/30"
                        >
                            <td className="px-6 py-5">
                                <p className="font-semibold text-stone-900">
                                    {detail.product.name}
                                </p>
                                <p className="mt-0.5 text-xs text-stone-400">
                                    Product ID: {detail.product.id}
                                </p>
                            </td>
                            <td className="px-6 py-5 text-center font-medium text-stone-600">
                                {detail.quantity}
                            </td>
                            <td className="px-6 py-5 text-right font-medium tracking-tight text-stone-600">
                                {formatCurrency(Number(detail.price))}
                            </td>
                            <td className="px-6 py-5 text-right font-bold tracking-tight text-stone-900">
                                {formatCurrency(
                                    Number(detail.price) *
                                        Number(detail.quantity),
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot className="bg-stone-50/50">
                    <tr className="border-t-2 border-stone-900">
                        <td
                            colSpan={3}
                            className="px-6 py-6 text-right text-[11px] font-bold tracking-wider text-stone-500 uppercase"
                        >
                            Total Payable Amount
                        </td>
                        <td className="px-6 py-6 text-right">
                            <span className="text-xl font-black tracking-tighter text-stone-900">
                                {formatCurrency(grandTotal)}
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
