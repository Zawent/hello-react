import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash, Package } from 'lucide-react';

interface Producto {
    id: number;
    nombre: string;
    sku?: string;
    descripcion?: string;
    activo: boolean;
}

interface Props {
    productos: Producto[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Productos', href: '/inventario/productos' },
];

export default function ProductosIndex({ productos }: Props) {
    const handleDelete = (producto: Producto) => {
        if (confirm(`¿Desactivar el producto "${producto.nombre}"?`)) {
            router.delete(`/inventario/productos/${producto.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
                            <Package className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold">Productos</h1>
                    </div>

                    <Link
                        href="/inventario/productos/create"
                        className="flex items-center gap-2 px-4 py-2 bg-lime-500 text-white font-bold rounded-xl hover:bg-lime-600"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Producto
                    </Link>
                </div>

                <div className="bg-card rounded-2xl border border-border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase">Nombre</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase">SKU</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase text-center">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {productos.map((producto) => (
                                <tr key={producto.id} className="hover:bg-muted/50">
                                    <td className="px-6 py-4 font-medium">
                                        <Link href={`/inventario/productos/${producto.id}`} className="text-lime-600 hover:underline">
                                            {producto.nombre}
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4 text-muted-foreground">
                                        {producto.sku || '-'}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                            producto.activo
                                                ? 'bg-lime-500/10 text-lime-600'
                                                : 'bg-rose-500/10 text-rose-600'
                                        }`}>
                                            {producto.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                href={`/inventario/productos/${producto.id}/edit`}
                                                className="p-2 text-teal-500"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Link>

                                            {producto.activo && (
                                                <button
                                                    onClick={() => handleDelete(producto)}
                                                    className="p-2 text-rose-500"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
