import { Head } from '@inertiajs/react';

import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { StatsGrid } from '@/components/dashboard/stats-grid';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type DashboardPageProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    stats,
    recentTransactions,
}: DashboardPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <StatsGrid stats={stats} />
                <div className="grid gap-4 lg:grid-cols-7">
                    <div className="lg:col-span-3">
                        <RecentTransactions transactions={recentTransactions} />
                    </div>
                    <SalesChart />
                </div>
            </div>
        </AppLayout>
    );
}
