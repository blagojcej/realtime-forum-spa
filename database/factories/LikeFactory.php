<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Like;
use Faker\Generator as Faker;

$factory->define(Like::class, function (Faker $faker) {
    return [
        'user_id' => function() {
            return \App\User::all()->random();
        }
    ];
});
