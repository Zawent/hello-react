import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash, Warehouse } from 'lucide-react';

interface Bodega {
    id: number;
    nombre: string;
    ubicacion?: string;
    descripcion?: string;
    activo: boolean;
}

interface Props {
    bodegas: Bodega[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Bodegas', href: '/inventario/bodegas' },
];

export default function BodegasIndex({ bodegas }: Props) {
    const handleDelete = (bodega: Bodega) => {
        if (confirm(`¿Deseas desactivar la bodega "${bodega.nombre}"?`)) {
            router.delete(`/inventario/bodegas/${bodega.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bodegas" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
                            <Warehouse className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">
                            Bodegas
                        </h1>
                    </div>

                    <Link
                        href="/inventario/bodegas/create"
                        className="flex items-center gap-2 px-4 py-2 bg-lime-500 text-white font-bold rounded-xl hover:bg-lime-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Nueva Bodega
                    </Link>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase">
                                        Ubicación
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-center">
                                        Estado
                                    </th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase text-center">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border">
                                {bodegas.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-12 text-center text-muted-foreground"
                                        >
                                            No hay bodegas registradas
                                        </td>
                                    </tr>
                                ) : (
                                    bodegas.map((bodega) => (
                                        <tr
                                            key={bodega.id}
                                            className="hover:bg-muted/50 transition-colors"
                                        >
                                            {/* Nombre (clickeable) */}
                                            <td className="px-6 py-4 font-medium">
                                                <Link
                                                    href={`/inventario/bodegas/${bodega.id}`}
                                                    className="text-lime-600 font-bold hover:underline"
                                                >
                                                    {bodega.nombre}
                                                </Link>
                                            </td>

                                            <td className="px-6 py-4 text-muted-foreground">
                                                {bodega.ubicacion || '-'}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                                                        bodega.activo
                                                            ? 'bg-lime-500/10 text-lime-600'
                                                            : 'bg-rose-500/10 text-rose-600'
                                                    }`}
                                                >
                                                    {bodega.activo ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Link
                                                        href={`/inventario/bodegas/${bodega.id}/edit`}
                                                        className="p-2 text-teal-500 hover:text-teal-600 rounded-lg transition-colors"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>

                                                    {bodega.activo && (
                                                        <button
                                                            onClick={() => handleDelete(bodega)}
                                                            className="p-2 text-rose-500 hover:text-rose-600 rounded-lg transition-colors"
                                                        >
                                                            <Trash className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
