<?php

namespace Database\Factories;

use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = $this->faker->dateTimeBetween('-1 year', 'now');
        $paymentMethods = ['Tunai', 'Transfer Bank', 'QRIS', 'E-Wallet'];
        
        return [
            'customer_id' => Customer::factory(),
            'date' => $date,
            'payment_method' => $this->faker->randomElement($paymentMethods),
            'payment_date' => $date, // Asumsikan bayar di hari yang sama untuk simpelnya
        ];
    }
}
