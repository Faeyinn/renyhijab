<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Category;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class ReportController extends Controller
{
    private function getFilteredQuery(Request $request)
    {
        $query = Transaction::with(['customer', 'details.product.category']);

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereDate('date', '>=', $request->start_date)
                  ->whereDate('date', '<=', $request->end_date);
        }

        if ($request->filled('category_id')) {
            $query->whereHas('details.product', function($q) use ($request) {
                $q->where('category_id', $request->category_id);
            });
        }
        
        return $query;
    }

    public function index(Request $request)
    {
        $transactions = $this->getFilteredQuery($request)->latest()->get()->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'date' => $transaction->date,
                'customer' => $transaction->customer,
                'total' => $transaction->details->sum(function($d) { return $d->price * $d->quantity; }),
                'details' => $transaction->details->map(function($d) {
                    return [
                        'product_name' => $d->product->name,
                        'category_name' => $d->product->category->name ?? '-',
                        'quantity' => $d->quantity,
                        'price' => $d->price,
                        'subtotal' => $d->quantity * $d->price,
                    ];
                }),
            ];
        });

        return Inertia::render('reports/index', [
            'transactions' => $transactions,
            'categories' => Category::all(),
            'filters' => $request->only(['start_date', 'end_date', 'category_id']),
        ]);
    }

    public function export($type, Request $request)
    {
        $transactions = $this->getFilteredQuery($request)->latest()->get();

        if ($type === 'excel') {
            $headers = [
                "Content-type"        => "text/csv",
                "Content-Disposition" => "attachment; filename=sales_report.csv",
                "Pragma"              => "no-cache",
                "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
                "Expires"             => "0"
            ];

            $callback = function() use ($transactions) {
                $file = fopen('php://output', 'w');
                fputcsv($file, ['ID', 'Date', 'Customer', 'Product', 'Category', 'Quantity', 'Price', 'Subtotal']);

                foreach ($transactions as $transaction) {
                    foreach ($transaction->details as $detail) {
                        fputcsv($file, [
                            $transaction->id,
                            $transaction->date,
                            $transaction->customer->name ?? 'Guest',
                            $detail->product->name,
                            $detail->product->category->name ?? '-',
                            $detail->quantity,
                            $detail->price,
                            $detail->quantity * $detail->price
                        ]);
                    }
                }
                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        }

        if ($type === 'pdf') {
            $pdf = Pdf::loadView('reports.pdf', ['transactions' => $transactions]);
            return $pdf->download('sales_report.pdf');
        }
        
        return redirect()->back();
    }
}
