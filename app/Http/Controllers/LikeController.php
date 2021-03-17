<?php

namespace App\Http\Controllers;

use App\Events\LikeEvent;
use App\Models\Like;
use App\Models\Reply;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['index', 'show']]);
    }

    public function likeIt(Reply $reply)
    {
        $reply->likes()->create([
            'user_id' =>  auth()->id(),
        ]);

        //with broadcast we are bradcasting to others, not to ourselfs
        //we're passing second argumet as 1 to know this is like, not unlike (0)
        broadcast(new LikeEvent($reply->id, 1))->toOthers();
    }

    public function unLikeIt(Reply $reply)
    {
        $reply->likes()
            ->where('user_id', auth()->id())
            ->first()
            ->delete();

        //with broadcast we are bradcasting to others, not to ourselfs
        //we're passing second argumet as 0 to know this is unlike, not like (1)
        broadcast(new LikeEvent($reply->id, 0))->toOthers();
    }
}
