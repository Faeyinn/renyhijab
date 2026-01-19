import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    className?: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    className = '',
}: StatsCardProps) {
    return (
        <Card
            className={`overflow-hidden border-orange-100 bg-white shadow-sm transition-all hover:border-orange-200 hover:shadow-md ${className}`}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-stone-600">
                    {title}
                </CardTitle>
                <div className="rounded-full bg-gradient-to-br from-orange-100 to-red-100 p-2.5 text-orange-700">
                    <Icon className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight text-stone-900">
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}
