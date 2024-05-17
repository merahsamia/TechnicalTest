<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Article;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{

    protected $model = Article::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'text' => $this->faker->paragraphs(3, true),
            'description' => $this->faker->paragraph,
            'author' => $this->faker->name,
            'image' => $this->faker->imageUrl,
            'category' => $this->faker->randomElement(['Technology', 'Health', 'Finance', 'Education']),

        ];
    }
}
