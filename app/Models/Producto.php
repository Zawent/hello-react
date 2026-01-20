<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'sku',
        'descripcion',
        'activo',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function proveedores()
    {
        return $this->belongsToMany(
            Proveedor::class,
            'producto_proveedor'
        )->withTimestamps();
    }

    public function bodegas()
    {
        return $this->belongsToMany(
            Bodega::class,
            'producto_bodega'
        )
        ->withPivot('stock')
        ->withTimestamps();
    }
}
