<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController ;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/articles-by-category', [ArticleController::class, 'getArticlesCategories']);
Route::get('/articles-by-category/{category}', [ArticleController::class, 'getArticlesByCategory']);
Route::resource('articles', ArticleController::class);

Route::get('/article/{id}', [ArticleController::class, 'show']);

