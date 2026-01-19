import { DataTable } from '@/components/common/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type RecentTransaction } from '@/types';
import { formatCurrency } from '@/utils/currency';

interface RecentTransactionsProps {
    transactions: RecentTransaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    const columns = [
        {
            key: 'id',
            header: 'ID Invoice',
            render: (transaction: RecentTransaction) => (
                <span className="font-mono text-xs text-stone-500">
                    #{transaction.id}
                </span>
            ),
        },
        {
            key: 'date',
            header: 'Date',
            className: 'text-stone-600',
        },
        {
            key: 'customer',
            header: 'Customer',
            className: 'font-medium text-stone-900',
        },
        {
            key: 'total',
            header: 'Total',
            className: 'font-medium text-emerald-700', // Use emerald for money/positive value
            render: (transaction: RecentTransaction) =>
                formatCurrency(transaction.total),
        },
    ];

    return (
        <div>
            <Card className="border-orange-100 shadow-sm">
                <CardHeader className="border-b border-orange-100 bg-gradient-to-r from-orange-50/50 to-white px-6 py-4">
                    <CardTitle className="text-base font-semibold text-stone-900">
                        Recent Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <DataTable
                        data={transactions}
                        columns={columns}
                        emptyMessage="No transactions found."
                        className="border-0"
                    />
                </CardContent>
            </Card>
        </div>
    );
}
