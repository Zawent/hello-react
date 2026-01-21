import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Package } from 'lucide-react';

interface Proveedor {
    id: number;
    nombre: string;
}

interface Bodega {
    id: number;
    nombre: string;
    stock?: number;
}

interface Producto {
    id: number;
    nombre: string;
    sku?: string;
    descripcion?: string;
    activo: boolean;
    proveedores: Proveedor[];
    bodegas: Bodega[];
}

interface Props {
    producto: Producto;
}

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Productos', href: '/inventario/productos' },
    { title: 'Detalle', href: `/inventario/productos/${id}` },
];

export default function ProductoShow({ producto }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(producto.id)}>
            <Head title={`Producto: ${producto.nombre}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            {producto.nombre}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            SKU: {producto.sku || 'Sin SKU'}
                        </p>
                        {producto.descripcion && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {producto.descripcion}
                            </p>
                        )}
                    </div>

                    <Link
                        href={`/inventario/productos/${producto.id}/edit`}
                        className="px-4 py-2 bg-muted border border-border rounded-xl font-bold hover:bg-muted/80"
                    >
                        Editar
                    </Link>
                </div>

                {/* Proveedores */}
                <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                        <Package className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-foreground">
                            Proveedores del producto
                        </h2>
                    </div>

                    {producto.proveedores.length === 0 ? (
                        <div className="px-6 py-12 text-center text-muted-foreground">
                            Este producto no tiene proveedores asociados.
                            <div className="mt-4">
                                <Link
                                    href="/inventario/proveedores/create"
                                    className="text-lime-600 font-bold hover:underline"
                                >
                                    Crear proveedor
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">
                                            Nombre
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {producto.proveedores.map((prov) => (
                                        <tr key={prov.id} className="hover:bg-muted/50">
                                            <td className="px-6 py-4 font-medium">
                                                <Link
                                                    href={`/inventario/proveedores/${prov.id}`}
                                                    className="text-lime-600 hover:underline"
                                                >
                                                    {prov.nombre}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
