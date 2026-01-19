<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\Customer;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = Transaction::with(['customer', 'details.product'])
            ->latest()
            ->get()
            ->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'date' => $transaction->date,
                    'customer' => $transaction->customer,
                    'payment_method' => $transaction->payment_method,
                    'payment_date' => $transaction->payment_date,
                    'details' => $transaction->details,
                    'total' => $transaction->details->sum(function ($detail) {
                        return $detail->price * $detail->quantity;
                    }),
                ];
            });

        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'customers' => Customer::all(),
            'products' => Product::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('transactions/create', [
            'customers' => Customer::all(),
            'products' => Product::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'date' => 'required|date',
            'payment_method' => 'required|string',
            'payment_date' => 'required|date',
            'details' => 'required|array|min:1',
            'details.*.product_id' => 'required|exists:products,id',
            'details.*.quantity' => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($request) {
            $transaction = Transaction::create([
                'customer_id' => $request->customer_id,
                'date' => \Carbon\Carbon::parse($request->date)->isToday() ? now() : $request->date,
                'payment_method' => $request->payment_method,
                'payment_date' => $request->payment_date,
            ]);

            foreach ($request->details as $detail) {
                $product = Product::find($detail['product_id']);
                TransactionDetail::create([
                    'transaction_id' => $transaction->id,
                    'product_id' => $detail['product_id'],
                    'quantity' => $detail['quantity'],
                    'price' => $product->price,
                ]);
            }
        });

        return redirect()->route('transactions.index')->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load(['customer', 'details.product']);
        return Inertia::render('transactions/show', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect()->back()->with('success', 'Transaction deleted successfully.');
    }
}
