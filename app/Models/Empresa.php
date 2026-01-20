<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'nit',
    ];

    public function usuarios()
    {
        return $this->hasMany(User::class);
    }

    public function proveedores()
    {
        return $this->hasMany(Proveedor::class);
    }

    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    public function bodegas()
    {
        return $this->hasMany(Bodega::class);
    }

    public function movimientosInventario()
    {
        return $this->hasMany(MovimientoInventario::class);
    }
}
