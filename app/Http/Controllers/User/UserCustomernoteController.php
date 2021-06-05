<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\ApiController;
use App\Models\User;
use App\Models\Customernote;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserCustomernoteController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        // get user's notes they have written on customers
        $customernotes = $user->customernotes;

        return $this->showAll($customernotes);
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @param  \App\Models\Customer  $customernote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user, Customernote $customernote)
    {
        // verify if user is author of customer note
        $this->checkUser($user, $customernote);

        // get updated notes
        $customernote->fill($request->only([
            'note',
        ]));

        // save to db
        $customernote->save();

        return $this->showOne($customernote);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, Customernote $customernote)
    {
        // verify if user is author of customer note
        $this->checkUser($user, $customernote);

        $customernote->delete();

        return $this->showOne($customernote);
    }

    protected function checkUser(User $user, Customernote $customernote)
    {
        if($user->id != $customernote->user_id){
            throw new HttpException(422, 'The specified user is not the actual author of the customer note.');
        }
    }
}
