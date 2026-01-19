<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $adjectives = ['Premium', 'Basic', 'Instan', 'Motif', 'Polos', 'Silk', 'Voal', 'Jersey'];
        $types = ['Pashmina', 'Square', 'Bergo', 'Scarf', 'Shawl'];
        
        $name = $this->faker->randomElement($adjectives) . ' ' . 
                $this->faker->randomElement($types) . ' ' . 
                $this->faker->firstNameFemale(); // Memberikan kesan nama produk butik

        return [
            'category_id' => Category::factory(),
            'name' => $name,
            'price' => $this->faker->numberBetween(35, 150) * 1000, // Harga 35rb - 150rb
        ];
    }
}
