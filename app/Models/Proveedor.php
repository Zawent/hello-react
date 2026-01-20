<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    protected $table = 'proveedores';

    protected $fillable = [
        'empresa_id',
        'nombre',
        'telefono',
        'correo',
        'documento',
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
            'producto_proveedor'
        )->withTimestamps();
    }
}
