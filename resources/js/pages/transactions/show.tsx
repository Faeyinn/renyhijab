import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Printer } from 'lucide-react';

import { InvoiceDetails } from '@/components/transactions/invoice-details';
import { InvoiceHeader } from '@/components/transactions/invoice-header';
import { InvoiceItemsTable } from '@/components/transactions/invoice-items-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type TransactionPageProps } from '@/types';

export default function TransactionsShow({ transaction }: TransactionPageProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Transactions',
            href: '/transactions',
        },
        {
            title: `Invoice #${transaction.id}`,
            href: `/transactions/${transaction.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Invoice #${transaction.id}`} />
            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-4 p-4">
                <div className="no-print flex items-center justify-between">
                    <Button
                        variant="ghost"
                        asChild
                        className="text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                    >
                        <Link href="/transactions">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to
                            Transactions
                        </Link>
                    </Button>
                    <Button
                        onClick={() => window.print()}
                        className="bg-orange-700 text-white shadow-sm hover:bg-orange-800"
                    >
                        <Printer className="mr-2 h-4 w-4" /> Print Invoice
                    </Button>
                </div>

                <div className="rounded-xl border border-orange-100 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
                    <InvoiceHeader invoiceId={transaction.id} />
                    <InvoiceDetails
                        customer={transaction.customer}
                        date={transaction.date}
                        paymentDate={transaction.payment_date}
                        paymentMethod={transaction.payment_method}
                    />
                    <InvoiceItemsTable details={transaction.details} />

                    <div className="text-center text-sm text-stone-500 print:mt-16">
                        <p>Thank you for shopping not at Renyhijab!</p>
                    </div>
                </div>
            </div>
            <style>{`
                @media print {
                    .no-print { display: none; }
                    body { -webkit-print-color-adjust: exact; }
                }
            `}</style>
        </AppLayout>
    );
}
