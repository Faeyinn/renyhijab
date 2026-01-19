interface InvoiceHeaderProps {
    invoiceId: number;
}

export function InvoiceHeader({ invoiceId }: InvoiceHeaderProps) {
    return (
        <div className="mb-10 border-b border-stone-100 pb-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="mb-1 text-4xl font-extrabold tracking-tight text-stone-900">
                        INVOICE
                    </h1>
                    <p className="inline-block rounded bg-orange-50 px-2 py-0.5 font-mono text-sm font-semibold text-orange-600">
                        #{invoiceId}
                    </p>
                </div>
                <div className="sm:text-right">
                    <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                        Renyhijab
                    </h2>
                    <p className="text-sm font-medium text-stone-500">
                        Transaction Management System
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                        Official Payment Record
                    </p>
                </div>
            </div>
        </div>
    );
}
