<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = [
        'body',
        'question_id',
        'user_id'
    ];

    protected static function boot()
    {
        parent::boot();
        //TODO: Comment before seeding database
        static::creating(function ($reply) {
            $reply->user_id = auth()->id();
        });
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
