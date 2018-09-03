<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Todo extends Model
{
    protected $fillable = ['title', 'due_at', 'is_complete'];

    protected $dates = ['due_at'];

	public function getDueAtAttribute($value) {
		return Carbon::parse($value)->format('m/d/Y');
	}

}
