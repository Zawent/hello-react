<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Proveedor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProveedorController extends Controller
{
    public function index(Request $request)
    {
        $empresaId = $request->user()->empresa_id;

        $proveedores = Proveedor::where('empresa_id', $empresaId)
            ->orderBy('nombre')
            ->get();

        return Inertia::render('inventario/proveedores/index', [
            'proveedores' => $proveedores,
        ]);
    }

    public function show(Proveedor $proveedor)
    {
        $this->authorizeEmpresa($proveedor);

        return Inertia::render('inventario/proveedores/show', [
            'proveedor' => $proveedor->load([
                'productos' => function ($query) {
                    $query->orderBy('nombre');
                }
            ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('inventario/proveedores/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'    => 'required|string|max:255',
            'telefono'  => 'nullable|string|max:50',
            'correo'    => 'nullable|email|max:255',
            'documento' => 'nullable|string|max:100',
        ]);

        Proveedor::create([
            'empresa_id' => $request->user()->empresa_id,
            'nombre'     => $request->nombre,
            'telefono'   => $request->telefono,
            'correo'     => $request->correo,
            'documento'  => $request->documento,
            'activo'     => true,
        ]);

        return redirect()
            ->route('inventario.proveedores.index') // ✅ CORRECTO
            ->with('success', 'Proveedor creado correctamente');
    }

    public function edit(Proveedor $proveedor)
    {
        $this->authorizeEmpresa($proveedor);

        return Inertia::render('inventario/proveedores/edit', [
            'proveedor' => $proveedor,
        ]);
    }

    public function update(Request $request, Proveedor $proveedor)
    {
        $this->authorizeEmpresa($proveedor);

        $request->validate([
            'nombre'    => 'required|string|max:255',
            'telefono'  => 'nullable|string|max:50',
            'correo'    => 'nullable|email|max:255',
            'documento' => 'nullable|string|max:100',
            'activo'    => 'boolean',
        ]);

        $proveedor->update($request->all());

        return redirect()
            ->route('inventario.proveedores.index') // ✅ CORRECTO
            ->with('success', 'Proveedor actualizado correctamente');
    }

    public function destroy(Proveedor $proveedor)
    {
        $this->authorizeEmpresa($proveedor);

        $proveedor->update(['activo' => false]);

        return redirect()
            ->route('inventario.proveedores.index') // ✅ CORRECTO
            ->with('success', 'Proveedor desactivado');
    }

    /**
     * Seguridad multiempresa
     */
    private function authorizeEmpresa(Proveedor $proveedor)
    {
        if ($proveedor->empresa_id !== auth()->user()->empresa_id) {
            abort(403);
        }
    }
}