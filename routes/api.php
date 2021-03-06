<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\UserCustomernoteController;
use App\Http\Controllers\User\UserCustomerCustomernoteController;
use App\Http\Controllers\Customer\CustomerController;
use App\Http\Controllers\Customernote\CustomernoteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// User
Route::resource('users', UserController::class);
Route::resource('users.customernotes', UserCustomernoteController::class);
Route::resource('users.customers.customernotes', UserCustomerCustomernoteController::class);

// Customer
Route::resource('customers', CustomerController::class);

// Customernote
Route::resource('customernotes', CustomernoteController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
