<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customernote;

class Customer extends Model
{
    use HasFactory;

    // run parent boot
    protected static function boot()
    {
        parent::boot();
    }

    protected $fillable = [
        'name',
        'address',
        'city',
        'state',
        'zipcode',
        'phone',
        'email',
    ];

    // model relationship between Customer and Customernote (one-to-many)
    public function customernotes()
    {
        return $this->hasMany(Customernote::class);
    }
}
