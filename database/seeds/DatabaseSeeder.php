<?php

use App\Models\Category;
use App\Models\Like;
use App\Models\Question;
use App\Models\Reply;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // $this->call(UsersTableSeeder::class);
        factory(User::class, 10)->create();
        factory(Category::class, 5)->create();
        factory(Question::class, 10)->create();
        factory(Reply::class, 20)->create()->each(function ($reply) {
            return $reply->likes()->save(factory(Like::class)->make());
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
