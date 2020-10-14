<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
//Auth
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'App\\Http\\Controllers\\Api\\AuthController@login');
    Route::post('logout', 'App\\Http\\Controllers\\Api\\AuthController@logout');
    Route::post('refresh', 'App\\Http\\Controllers\\Api\\AuthController@refresh');
    Route::post('me', 'App\\Http\\Controllers\\Api\\AuthController@me');


});

//User
Route::group([
    'middleware' => 'apiJwt',
    'prefix' => 'users'
], function() {
    Route::get('', "App\\Http\\Controllers\\Api\\UserController@index");
});

//Animal

Route::group([
    'prefix' => 'animal'
], function() {
    Route::get('/list/{page?}', "App\\Http\\Controllers\\Api\\AnimalController@index");
    Route::get('/{id}', "App\\Http\\Controllers\\Api\\AnimalController@getAnimal");
    Route::post('/create', "App\\Http\\Controllers\\Api\\AnimalController@createAnimal")->middleware('apiJwt');
});
