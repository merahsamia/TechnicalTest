<?php

use Illuminate\Support\Facades\Route;

Route::get('/storage/{path}', function ($path) {
    // Get the full path to the file in the storage directory
    $filePath = storage_path('app/public/' . $path);

    // Check if the file exists
    if (!file_exists($filePath)) {
        abort(404);
    }

    // Return the file with appropriate MIME type
    return response()->file($filePath);
    })->where('path', '.*');

    Route::get('/{any}', function () {
        return view('app');
        })->where('any', '.*');
