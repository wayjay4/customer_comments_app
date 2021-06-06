<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function customerboard()
    {
        // get the currently authenticated user
        $user = Auth::user();

        return view('customerboard', [
            'user' => $user,
            'page' => 'Customer Board',
        ]);
    }
}
