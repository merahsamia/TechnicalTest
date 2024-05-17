<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\Article;


class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::all(), 200);
    }


    public function getArticlesCategories()
    {

        $articles = Article::all()->groupBy('category');

        $categories = $articles->map(function ($group) {

            return $group->take(3);

        });

        return response()->json($categories);
    }


    public function getArticlesByCategory($category)
    {
        $articles = Article::where('category', $category)->paginate(1);
        return response()->json($articles);
    }


    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'text' => 'required|string',
                'description' => 'nullable|string',
                'author' => 'required|string|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
                'category' => 'required|string|max:255',
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('articles', 'public');

                // Add the image path to the validated data
                $validated['image'] = $imagePath;
            }

            // Create the article
            $article = Article::create($validated);

            return response()->json($article, 201);
        } catch (ValidationException $e) {
            // If validation fails, return validation errors as JSON
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Catch any other exceptions and return as JSON
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function show($id)
    {

        $article = Article::find($id);

        if (!$article) {
            return response()->json(['error' => 'Article not found'], 404);
        }

        return response()->json($article, 200);

    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'text' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'author' => 'sometimes|required|string|max:255',
            'image' => 'nullable|string|max:255',
            'category' => 'sometimes|required|string|max:255',
        ]);

        $article = Article::findOrFail($id);
        $article->update($validated);

        return response()->json($article, 200);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return response()->json(null, 204);
    }
}
