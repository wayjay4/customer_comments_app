<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Customer\CustomerboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

// route for customer board
Route::any('customerboard', [CustomerboardController::class, 'customerboard'])
    ->name('customerboard')
    ->middleware(['auth:sanctum', 'verified']);

// route to work with react requests
Route::any('customerboard/{any}', [CustomerboardController::class, 'customerboard'])
    ->where('any', '.*')
    ->middleware(['auth:sanctum', 'verified']);
