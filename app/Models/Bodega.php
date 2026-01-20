<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bodega extends Model
{
    protected $table = 'bodegas';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'ubicacion',
        'descripcion',
        'activo',
    ];

    public function empresa()
    {
        return $this->belongsTo(Empresa::class);
    }

    public function productos()
    {
        return $this->belongsToMany(
            Producto::class,
            'producto_bodega'
        )
        ->withPivot('stock')
        ->withTimestamps();
    }
}
