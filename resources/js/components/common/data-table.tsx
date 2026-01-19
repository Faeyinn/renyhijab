import { type Column } from '@/types';

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    emptyMessage?: string;
    className?: string;
}

export function DataTable<T>({
    data,
    columns,
    emptyMessage = 'No data found.',
    className = '',
}: DataTableProps<T>) {
    return (
        <div
            className={`overflow-hidden rounded-xl border border-red-50 bg-white shadow-sm ${className}`}
        >
            <table className="w-full text-left text-sm">
                <thead className="border-b border-red-50 bg-stone-50/50 font-semibold text-red-950">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className={`px-4 py-3 font-medium ${column.className || ''}`}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-red-50">
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className="border-t border-red-50 transition-colors hover:bg-stone-50/40"
                        >
                            {columns.map((column) => (
                                <td
                                    key={String(column.key)}
                                    className={`px-4 py-3 ${column.className || ''}`}
                                >
                                    {column.render
                                        ? column.render(item)
                                        : String(
                                              item[column.key as keyof T] ||
                                                  '-',
                                          )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-8 text-center text-stone-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
