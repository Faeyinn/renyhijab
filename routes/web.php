<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/chart-data', [\App\Http\Controllers\DashboardController::class, 'getChartData'])->name('dashboard.chart-data');

    Route::resource('categories', \App\Http\Controllers\CategoryController::class);
    Route::resource('customers', \App\Http\Controllers\CustomerController::class);
    Route::resource('products', \App\Http\Controllers\ProductController::class);
    Route::resource('transactions', \App\Http\Controllers\TransactionController::class);
});

require __DIR__.'/settings.php';
