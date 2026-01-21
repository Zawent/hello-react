<?php

namespace App\Http\Controllers;

use App\Models\Bodega;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BodegaController extends Controller
{
    public function index(Request $request)
    {
        $empresaId = $request->user()->empresa_id;

        $bodegas = Bodega::where('empresa_id', $empresaId)
            ->orderBy('nombre')
            ->get();

        return Inertia::render('inventario/bodegas/index', [
            'bodegas' => $bodegas,
        ]);
    }

    public function show(Bodega $bodega)
    {
        $this->authorizeEmpresa($bodega);

        return Inertia::render('inventario/bodegas/show', [
            'bodega' => $bodega,
            'productos' => [], // 👈 por ahora vacío
        ]);
    }

    public function create()
    {
        return Inertia::render('inventario/bodegas/create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'      => 'required|string|max:255',
            'ubicacion'   => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        Bodega::create([
            'empresa_id'  => $request->user()->empresa_id,
            'nombre'      => $request->nombre,
            'ubicacion'   => $request->ubicacion,
            'descripcion' => $request->descripcion,
            'activo'      => true,
        ]);

        return redirect()
            ->route('inventario.bodegas.index') // ✅ AQUÍ
            ->with('success', 'Bodega creada correctamente');
    }

    public function edit(Bodega $bodega)
    {
        $this->authorizeEmpresa($bodega);

        return Inertia::render('inventario/bodegas/edit', [
            'bodega' => $bodega,
        ]);
    }

    public function update(Request $request, Bodega $bodega)
    {
        $this->authorizeEmpresa($bodega);

        $request->validate([
            'nombre'      => 'required|string|max:255',
            'ubicacion'   => 'nullable|string|max:255',
            'descripcion' => 'nullable|string',
            'activo'      => 'boolean',
        ]);

        $bodega->update($request->all());

        return redirect()
            ->route('inventario.bodegas.index') // ✅ AQUÍ
            ->with('success', 'Bodega actualizada correctamente');
    }

    public function destroy(Bodega $bodega)
    {
        $this->authorizeEmpresa($bodega);

        $bodega->update(['activo' => false]);

        return redirect()
            ->route('inventario.bodegas.index') // ✅ AQUÍ
            ->with('success', 'Bodega desactivada');
    }

    /**
     * Seguridad multiempresa
     */
    private function authorizeEmpresa(Bodega $bodega)
    {
        if ($bodega->empresa_id !== auth()->user()->empresa_id) {
            abort(403);
        }
    }
}
