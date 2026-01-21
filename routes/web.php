<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\BodegaController;
use App\Http\Controllers\ProductoController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('inventario')->name('inventario.')->group(function () {
        Route::resource('productos', ProductoController::class)
            ->parameters(['productos' => 'producto']);
        Route::get('/movimientos', fn () => inertia('inventario/movimientos/index'))->name('movimientos.index');        
        Route::resource('proveedores', ProveedorController::class)->parameters([
            'proveedores' => 'proveedor'
        ]);
        Route::resource('bodegas', BodegaController::class)->parameters([
            'bodegas' => 'bodega'
        ]);

    });
});

require __DIR__.'/settings.php';