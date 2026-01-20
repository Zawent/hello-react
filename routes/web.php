<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProveedorController;

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
        Route::get('/productos', fn () => inertia('inventario/productos/index'))->name('productos.index');
        Route::get('/movimientos', fn () => inertia('inventario/movimientos/index'))->name('movimientos.index');
        
        // Cambia esto:
        Route::resource('proveedores', ProveedorController::class)->parameters([
            'proveedores' => 'proveedor'
        ]);
        
        Route::get('/bodegas', fn () => inertia('inventario/bodegas/index'))->name('bodegas.index');
    });
});

require __DIR__.'/settings.php';