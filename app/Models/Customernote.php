<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;

class Customernote extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'customer_id',
        'user_id',
    ];

    // model relationship between Customernote and Customers (one-to-one)
    public function customers()
    {
        return $this->belongsTo(Customer::class);
    }

    // model relationship between Customernote and User (one-to-one)
    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
