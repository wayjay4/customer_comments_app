<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;
use App\Models\Customer;
use Illuminate\Support\Collection;


class CustomerController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        // query DB to get all customers with their respective notes and note authors
        $customers = DB::table('customers')
            ->leftJoin('customernotes', 'customers.id', '=', 'customernotes.customer_id')
            ->leftJoin('users', 'users.id', '=', 'customernotes.user_id')
            ->select('customers.*', 'customernotes.id as note_id', 'customernotes.note', 'users.id as creator_id', 'users.name as note_creator', 'customernotes.updated_at as note_updated_on', 'customernotes.created_at as note_created_at')
            ->orderBy('customers.id', 'asc')
            ->orderBy('customernotes.updated_at', 'desc')
            ->get();

        // combine customers listed with multiple customernotes (ie. merge duplicate rows of customers and their customer notes)
        $formattedArray = array();
        foreach($customers as $key=>$customer){
            if(!isset($formattedArray[intval($customer->id)-1])){
                $formattedArray[intval($customer->id)-1] = [
                    'id' => $customer->id,
                    'name' => $customer->name,
                    'address' => $customer->address,
                    'city' => $customer->city,
                    'state' => $customer->state,
                    'zipcode' => $customer->zipcode,
                    'phone' => $customer->phone,
                    'email' => $customer->email,
                    'created_at' => $customer->created_at,
                    'updated_at' => $customer->updated_at,
                    'customernote' => [
                        [
                            'note_id' => $customer->note_id,
                            'note' => $customer->note,
                            'creator_id' => $customer->creator_id,
                            'note_creator' => $customer->note_creator,
                            'note_updated_on' => $customer->note_updated_on,
                            'note_created_at' => $customer->note_created_at,
                        ]
                    ],
                ];
            }
            else{
                $customernote = [
                            'note_id' => $customer->note_id,
                            'note' => $customer->note,
                            'creator_id' => $customer->creator_id,
                            'note_creator' => $customer->note_creator,
                            'note_updated_on' => $customer->note_updated_on,
                            'note_created_at' => $customer->note_created_at,
                ];

                array_push($formattedArray[intval($customer->id)-1]['customernote'], $customernote);
            }
        }

        // convert array to a collection object
        $customers = collect($formattedArray);

        return $this->showAll($customers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Customer $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return $this->showOne($customer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
