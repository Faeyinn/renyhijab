import { Banknote, CalendarRange, Receipt, Wallet } from 'lucide-react';
import { type Stats } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { StatsCard } from './stats-card';

interface StatsGridProps {
    stats: Stats;
}

export function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Pendapatan Hari Ini"
                value={formatCurrency(stats.revenueToday)}
                icon={Banknote}
            />
            <StatsCard
                title="Pendapatan Bulan Ini"
                value={formatCurrency(stats.revenueMonth)}
                icon={CalendarRange}
            />
            <StatsCard
                title="Total Pendapatan"
                value={formatCurrency(stats.totalRevenue)}
                icon={Wallet}
            />
            <StatsCard
                title="Transaksi Hari Ini"
                value={stats.transactionsToday}
                icon={Receipt}
            />
        </div>
    );
}
