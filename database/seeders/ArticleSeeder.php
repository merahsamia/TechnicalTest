<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;


class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Article::factory()->count(10)->create();

        Article::factory()->create([
            'title' =>'Lorem Ipsum',
            'text' => 'Lorem Ipsum is simply dummy text of the printing',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
            'author' => 'Author Lorem Ipsum',
            'image' => 'articles/social.jpg',
            'category' => 'Technology',

        ]);
        Article::factory()->create([
            'title' =>'Lorem Ipsum',
            'text' => 'Lorem Ipsum is simply dummy text of the printing',
            'description' => 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.',
            'author' => 'Author Lorem Ipsum',
            'image' => 'articles/technology.png',
            'category' => 'Technology',

        ]);

        Article::factory()->create([
            'title' => 'Another Article',
            'text' => 'This is another dummy text for testing purposes',
            'description' => 'Another dummy text for the printing and typesetting industry.',
            'author' => 'Another Author',
            'image' => 'articles/science.jpeg',
            'category' => 'Science',
        ]);

    }

    
}
