import axios from 'axios';
import Chart from 'chart.js/auto';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/currency';

type Period = 'day' | 'week' | 'month' | 'year';

export function SalesChart() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart | null>(null);
    const [period, setPeriod] = useState<Period>('week');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{
        labels: string[];
        data: number[];
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/dashboard/chart-data', {
                    params: { period },
                });
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch chart data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [period]);

    useEffect(() => {
        if (!data || !chartRef.current) return;

        // Destroy previous instance
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(249, 115, 22, 0.2)'); // Orange-500 equivalent opacity
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');

        chartInstance.current = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Total Penjualan',
                        data: data.data,
                        borderColor: '#f97316', // Orange-500
                        backgroundColor: gradient,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4, // Smooth curves
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#f97316',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#1c1917',
                        bodyColor: '#1c1917',
                        borderColor: '#e7e5e4',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function (context) {
                                return formatCurrency(Number(context.raw));
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: '#78716c',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f5f5f4',
                        },
                        ticks: {
                            color: '#78716c',
                            callback: function (value) {
                                return new Intl.NumberFormat('id-ID', {
                                    notation: 'compact',
                                    compactDisplay: 'short',
                                }).format(Number(value));
                            },
                        },
                        border: {
                            display: false,
                        },
                    },
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
            },
        });

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <Card className="col-span-full border-orange-100 shadow-sm transition-all hover:border-orange-200 hover:shadow-md lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold text-stone-800">
                    Grafik Penjualan
                </CardTitle>
                <div className="flex gap-1 rounded-lg bg-stone-100 p-1">
                    {(['day', 'week', 'month', 'year'] as const).map((p) => (
                        <Button
                            key={p}
                            variant="ghost"
                            size="sm"
                            onClick={() => setPeriod(p)}
                            className={`h-7 px-3 text-xs capitalize ${
                                period === p
                                    ? 'bg-white font-medium text-orange-600 shadow-sm hover:text-orange-700'
                                    : 'text-stone-500 hover:bg-stone-200 hover:text-stone-700'
                            }`}
                        >
                            {p === 'day'
                                ? 'Hari'
                                : p === 'week'
                                  ? 'Minggu'
                                  : p === 'month'
                                    ? 'Bulan'
                                    : 'Tahun'}
                        </Button>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative h-[300px] w-full">
                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                            <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                        </div>
                    )}
                    <canvas ref={chartRef} />
                </div>
            </CardContent>
        </Card>
    );
}
