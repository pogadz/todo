<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Todo;
use Carbon\Carbon;

class TodoController extends Controller
{

    public function index()
    {
        $todos = Todo::orderBy('created_at', 'DESC')->get();
        return view('todo.index', compact('todos'));
    }
    
}
