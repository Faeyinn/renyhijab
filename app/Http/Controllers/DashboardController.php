<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $recentTransactions = Transaction::with('customer')
            ->latest('date')
            ->take(5)
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'date' => $transaction->date,
                    'customer' => $transaction->customer->name,
                    'total' => $transaction->details->sum(fn($d) => $d->price * $d->quantity),
                ];
            });

        $totalRevenue = TransactionDetail::sum(DB::raw('price * quantity'));

        $stats = [
            'revenueToday' => TransactionDetail::whereHas('transaction', function ($query) {
                $query->whereDate('date', today());
            })->sum(DB::raw('price * quantity')),
            
            'revenueMonth' => TransactionDetail::whereHas('transaction', function ($query) {
                $query->whereMonth('date', now()->month)
                    ->whereYear('date', now()->year);
            })->sum(DB::raw('price * quantity')),
            
            'totalRevenue' => $totalRevenue,
            
            'transactionsToday' => Transaction::whereDate('date', today())->count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentTransactions' => $recentTransactions,
        ]);
    }

    public function getChartData(Request $request)
    {
        $period = $request->input('period', 'day'); // day, week, month, year
        $data = [];
        $labels = [];

        switch ($period) {
            case 'day':
                // Hourly data for today
                for ($i = 0; $i < 24; $i++) {
                    $labels[] = sprintf('%02d:00', $i);
                    $data[] = TransactionDetail::whereHas('transaction', function ($q) use ($i) {
                        $q->whereDate('date', today())
                          ->whereTime('date', '>=', sprintf('%02d:00:00', $i))
                          ->whereTime('date', '<=', sprintf('%02d:59:59', $i));
                    })->sum(DB::raw('price * quantity'));
                }
                break;

            case 'week':
                // Daily data for this week (Mon-Sun)
                $startOfWeek = now()->startOfWeek();
                for ($i = 0; $i < 7; $i++) {
                    $date = $startOfWeek->copy()->addDays($i);
                    $labels[] = $date->translatedFormat('l'); // Monday, Tuesday...
                    $data[] = TransactionDetail::whereHas('transaction', function ($q) use ($date) {
                        $q->whereDate('date', $date);
                    })->sum(DB::raw('price * quantity'));
                }
                break;

            case 'month':
                // Daily data for this month
                $daysInMonth = now()->daysInMonth;
                for ($i = 1; $i <= $daysInMonth; $i++) {
                    $labels[] = (string)$i;
                    $data[] = TransactionDetail::whereHas('transaction', function ($q) use ($i) {
                        $q->whereMonth('date', now()->month)
                          ->whereYear('date', now()->year)
                          ->whereDay('date', $i);
                    })->sum(DB::raw('price * quantity'));
                }
                break;

            case 'year':
                // Monthly data for this year
                for ($i = 1; $i <= 12; $i++) {
                    $labels[] = Carbon::create()->month($i)->translatedFormat('F'); // January, February...
                    $data[] = TransactionDetail::whereHas('transaction', function ($q) use ($i) {
                        $q->whereYear('date', now()->year)
                          ->whereMonth('date', $i);
                    })->sum(DB::raw('price * quantity'));
                }
                break;
        }

        return response()->json([
            'labels' => $labels,
            'data' => $data,
        ]);
    }
}
