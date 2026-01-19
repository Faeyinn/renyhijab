import { Banknote } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RevenueCardProps {
    value: string;
}

export function RevenueCard({ value }: RevenueCardProps) {
    return (
        <Card className="border-orange-100 bg-gradient-to-r from-white to-orange-50/30 shadow-sm transition-all hover:border-orange-200 hover:shadow-md md:col-span-2 lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-stone-600">
                    Total Revenue
                </CardTitle>
                <div className="rounded-full bg-gradient-to-br from-orange-100 to-red-100 p-2.5 text-orange-700">
                    <Banknote className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight text-orange-800">
                    {value}
                </div>
            </CardContent>
        </Card>
    );
}
