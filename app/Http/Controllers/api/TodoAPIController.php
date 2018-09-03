<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Todo;

class TodoAPIController extends Controller
{
	public function index(){
		return Todo::orderBy('created_at', 'DESC')->get();
	}

	public function get(Request $request){
		return Todo::findOrFail($request->id);
	}

	public function store(Request $request){
		Todo::create($request->all());
		return Todo::orderBy('created_at', 'DESC')->get();
	}

	public function update(Request $request){

		$todo = Todo::findOrFail($request->id);
		$todo->update($request->all());
		//return $todo->orderBy('created_at', 'DESC');
		return $todo;
	}

	public function getActive(){
		$todo = Todo::where('is_complete', 0)->orderBy('created_at', 'DESC')->get();
		return $todo;
	}

	public function complete(Request $request){
		$todo = Todo::findOrFail($request->id);
		$todo->update($request->all());
		return $todo;
	}

	public function getComplete(Request $request){
		$todo = Todo::where('is_complete', 1)->orderBy('created_at', 'DESC')->get();
		return $todo;
	}

	public function delete(Request $request){
		 Todo::destroy($request->id);
		 return Todo::orderBy('created_at', 'DESC')->get();
	}

}
