import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Proveedores', href: '/inventario/proveedores' },
    { title: 'Nuevo', href: '/inventario/proveedores/create' },
];

export default function ProveedorCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        telefono: '',
        correo: '',
        activo: true,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/inventario/proveedores');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Proveedor" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <h1 className="text-2xl font-bold text-foreground">Crear Proveedor</h1>

                <form onSubmit={submit} className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col gap-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Nombre</label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-lime-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Teléfono</label>
                        <input
                            type="text"
                            value={data.telefono}
                            onChange={(e) => setData('telefono', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-lime-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-1">Correo</label>
                        <input
                            type="email"
                            value={data.correo}
                            onChange={(e) => setData('correo', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-lime-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label className="text-sm font-medium text-foreground">Activo</label>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Link
                            href="/inventario/proveedores"
                            className="px-4 py-2 bg-muted border border-border rounded-xl hover:bg-muted/80 font-bold"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-lime-500 text-white rounded-xl font-bold hover:bg-lime-600 transition-colors"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
