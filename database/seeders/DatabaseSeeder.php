<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed User Utama
        User::factory()->create([
            'name' => 'Admin Jaeyi',
            'email' => 'jaeyi@gmail.com',
            'password' => bcrypt('jaeyisbd'),
        ]);

        // 2. Seed Categories (Data Nyata)
        $categories = ['Pashmina', 'Segi Empat', 'Bergo', 'Inner Hijab', 'Aksesoris'];
        $categoryModels = [];
        foreach ($categories as $cat) {
            $categoryModels[] = Category::create(['name' => $cat]);
        }

        // 3. Seed 10 Produk (Data Nyata)
        $productsData = [
            ['name' => 'Pashmina Ceruty Baby Doll', 'price' => 35000, 'stock' => 50, 'category_index' => 0],
            ['name' => 'Pashmina Kaos Rayon', 'price' => 45000, 'stock' => 30, 'category_index' => 0],
            ['name' => 'Paris Premium Square', 'price' => 25000, 'stock' => 100, 'category_index' => 1],
            ['name' => 'Bella Square', 'price' => 20000, 'stock' => 150, 'category_index' => 1],
            ['name' => 'Bergo Maryam Diamond', 'price' => 30000, 'stock' => 40, 'category_index' => 2],
            ['name' => 'Bergo Hamidah Sport', 'price' => 25000, 'stock' => 60, 'category_index' => 2],
            ['name' => 'Ciput Rajut Anti Pusing', 'price' => 10000, 'stock' => 200, 'category_index' => 3],
            ['name' => 'Ciput Ninja', 'price' => 15000, 'stock' => 80, 'category_index' => 3],
            ['name' => 'Pin Magnet Premium', 'price' => 12000, 'stock' => 100, 'category_index' => 4],
            ['name' => 'Brooch Mutiara', 'price' => 18000, 'stock' => 50, 'category_index' => 4],
        ];

        $productModels = [];
        foreach ($productsData as $data) {
            $catId = $categoryModels[$data['category_index']]->id;
            $productModels[] = Product::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'stock' => $data['stock'],
                'category_id' => $catId
            ]);
        }

        // 4. Seed 10 Pelanggan (Data Nyata)
        $customersData = [
            ['name' => 'Siti Aminah', 'phone' => '081234567890', 'address' => 'Jl. Merdeka No. 10'],
            ['name' => 'Budi Santoso', 'phone' => '081234567891', 'address' => 'Jl. Mawar No. 5'],
            ['name' => 'Dewi Lestari', 'phone' => '081234567892', 'address' => 'Griya Asri Blok A1'],
            ['name' => 'Lutfi Hakim', 'phone' => '081234567893', 'address' => 'Perum Indah B3'],
            ['name' => 'Rina Wijaya', 'phone' => '081234567894', 'address' => 'Jl. Melati No. 12'],
            ['name' => 'Adit Pratama', 'phone' => '081234567895', 'address' => 'Kost Ceria No. 2'],
            ['name' => 'Maya Sari', 'phone' => '081234567896', 'address' => 'Jl. Anggrek No. 8'],
            ['name' => 'Hendra Kurniawan', 'phone' => '081234567897', 'address' => 'Apartemen Gading Lt 5'],
            ['name' => 'Putri Utami', 'phone' => '081234567898', 'address' => 'Jl. Kenanga No. 15'],
            ['name' => 'Faisal Reza', 'phone' => '081234567899', 'address' => 'Jl. Dahlia No. 4'],
        ];

        $customerModels = [];
        foreach ($customersData as $data) {
            $customerModels[] = Customer::create($data);
        }

        // 5. Seed 10 Transaksi dummy awal
        for ($i = 0; $i < 10; $i++) {
            $customer = $customerModels[$i];
            $product = $productModels[array_rand($productModels)];
            
            $transaction = Transaction::create([
                'customer_id' => $customer->id,
                'date' => now()->subDays(rand(1, 30)),
                'payment_method' => 'Cash',
                'payment_date' => now()->subDays(rand(1, 30)),
            ]);

            TransactionDetail::create([
                'transaction_id' => $transaction->id,
                'product_id' => $product->id,
                'quantity' => rand(1, 3),
                'price' => $product->price,
            ]);
        }
    }
}
