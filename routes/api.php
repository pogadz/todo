<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(["prefix" => "todos"], function(){

	Route::get("/", "api\TodoAPIController@index");
	Route::post("/", "api\TodoAPIController@store");
	Route::get("active", "api\TodoAPIController@getActive");
	Route::get("complete", "api\TodoAPIController@getComplete");
	Route::post("complete/{id}", "api\TodoAPIController@complete");

	Route::group(["prefix" => "{id}"], function(){
		Route::get("/", "api\TodoAPIController@get");
		Route::patch("/", "api\TodoAPIController@update");
		Route::delete("/", "api\TodoAPIController@delete");

	});

});





