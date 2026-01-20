import { Head, router } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon, FileSpreadsheet, FileText, Filter } from 'lucide-react';
import { useState } from 'react';

import { PageHeader } from '@/components/common/page-header';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Category, Customer } from '@/types';
import { formatCurrency } from '@/utils/currency';

interface ReportDetail {
    product_name: string;
    category_name: string;
    quantity: number;
}

interface ReportTransaction {
    id: number;
    date: string;
    total: number;
    customer: Customer;
    details: ReportDetail[];
}

interface ReportProps {
    transactions: ReportTransaction[];
    categories: Category[];
    filters: {
        start_date?: string;
        end_date?: string;
        category_id?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Reports',
        href: '/reports',
    },
];

export default function ReportsIndex({
    transactions,
    categories,
    filters,
}: ReportProps) {
    const [filterValues, setFilterValues] = useState({
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        category_id: filters.category_id || 'all',
    });

    // Helper to handle date selection from Calendar
    const handleDateSelect = (
        key: 'start_date' | 'end_date',
        date: Date | undefined,
    ) => {
        if (date) {
            setFilterValues((prev) => ({
                ...prev,
                [key]: format(date, 'yyyy-MM-dd'),
            }));
        } else {
            setFilterValues((prev) => ({ ...prev, [key]: '' }));
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilterValues((prev) => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        router.get(
            '/reports',
            {
                ...filterValues,
                category_id:
                    filterValues.category_id === 'all'
                        ? undefined
                        : filterValues.category_id,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const resetFilters = () => {
        setFilterValues({
            start_date: '',
            end_date: '',
            category_id: 'all',
        });
        router.get('/reports');
    };

    const handleExport = (type: 'excel' | 'pdf') => {
        const params = new URLSearchParams();
        if (filterValues.start_date)
            params.append('start_date', filterValues.start_date);
        if (filterValues.end_date)
            params.append('end_date', filterValues.end_date);
        if (filterValues.category_id && filterValues.category_id !== 'all') {
            params.append('category_id', filterValues.category_id);
        }

        window.open(`/reports/export/${type}?${params.toString()}`, '_blank');
    };

    const totalRevenue = transactions.reduce((sum, t) => sum + t.total, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Reports" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <PageHeader title="Sales Reports" />

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">
                            Filter Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-4">
                            {/* Start Date */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Start Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !filterValues.start_date &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {filterValues.start_date ? (
                                                format(
                                                    new Date(
                                                        filterValues.start_date,
                                                    ),
                                                    'PPP',
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                filterValues.start_date
                                                    ? new Date(
                                                          filterValues.start_date,
                                                      )
                                                    : undefined
                                            }
                                            onSelect={(date) =>
                                                handleDateSelect(
                                                    'start_date',
                                                    date,
                                                )
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* End Date */}
                            <div className="flex flex-col gap-1.5">
                                <Label>End Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !filterValues.end_date &&
                                                    'text-muted-foreground',
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {filterValues.end_date ? (
                                                format(
                                                    new Date(
                                                        filterValues.end_date,
                                                    ),
                                                    'PPP',
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                filterValues.end_date
                                                    ? new Date(
                                                          filterValues.end_date,
                                                      )
                                                    : undefined
                                            }
                                            onSelect={(date) =>
                                                handleDateSelect(
                                                    'end_date',
                                                    date,
                                                )
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Product Category</Label>
                                <Select
                                    value={filterValues.category_id}
                                    onValueChange={(val) =>
                                        handleFilterChange('category_id', val)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            All Categories
                                        </SelectItem>
                                        {categories.map((c) => (
                                            <SelectItem
                                                key={c.id}
                                                value={c.id.toString()}
                                            >
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Filter Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={applyFilters}
                                    className="bg-rose-700 text-white hover:bg-rose-800"
                                >
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={resetFilters}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-center justify-between rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
                    <div className="text-lg font-semibold">
                        Total Revenue:{' '}
                        <span className="text-rose-700">
                            {formatCurrency(totalRevenue)}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => handleExport('excel')}
                            className="border-green-600 text-green-700 hover:bg-green-50"
                        >
                            <FileSpreadsheet className="mr-2 h-4 w-4" />
                            Export Excel
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleExport('pdf')}
                            className="border-red-600 text-red-700 hover:bg-red-50"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="text-right">
                                    Total
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {transactions.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No transactions found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            {transaction.date}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.customer?.name ||
                                                'Guest'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                {transaction.details.map(
                                                    (d, i) => (
                                                        <div
                                                            key={i}
                                                            className="text-xs text-stone-600"
                                                        >
                                                            {d.product_name} (
                                                            {d.category_name}) x{' '}
                                                            {d.quantity}
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {formatCurrency(transaction.total)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
