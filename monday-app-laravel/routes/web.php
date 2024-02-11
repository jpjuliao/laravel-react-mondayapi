<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MondayController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get(
    '/board',
    [MondayController::class, 'fetchIssues']
)->name('board');

Route::post(
    '/create-issue',
    [MondayController::class, 'createIssue']
)->name('create.issue');

Route::patch(
    '/update-issue/{id}',
    [MondayController::class, 'updateIssue']
)->name('update.issue');

Route::delete(
    '/delete-issue/{id}',
    [MondayController::class, 'deleteIssue']
)->name('delete.issue');
