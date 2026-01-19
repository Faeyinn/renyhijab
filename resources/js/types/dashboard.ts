export interface Stats {
    revenueToday: number;
    revenueMonth: number;
    totalRevenue: number;
    transactionsToday: number;
}

export interface RecentTransaction {
    id: number;
    date: string;
    customer: string;
    total: number;
    [key: string]: unknown;
}

export interface DashboardPageProps {
    stats: Stats;
    recentTransactions: RecentTransaction[];
}
