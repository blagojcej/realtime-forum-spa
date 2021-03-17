<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Question;
use Faker\Generator as Faker;

$factory->define(Question::class, function (Faker $faker) {
    $title = $faker->sentence;
    return [
        'title' => $title,
        'slug' => str_slug($title),
        'body' => $faker->text,
        'category_id' => function() {
            return \App\Models\Category::all()->random();
        },
        'user_id' => function() {
            return \App\User::all()->random();
        }
    ];
});
