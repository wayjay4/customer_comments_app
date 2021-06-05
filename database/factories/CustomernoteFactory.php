<?php

namespace Database\Factories;

use App\Models\Customernote;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomernoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Customernote::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // get a customer and user id
        $customerID = Customer::all()->random();
        $userID = User::all()->random();

        return [
            'note' => $this->faker->realText($maxNbChars = 200, $indexSize = 2),
            'customer_id' => $customerID,
            'user_id' => $userID,
        ];
    }
}
