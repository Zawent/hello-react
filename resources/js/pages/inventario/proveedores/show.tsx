import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Package } from 'lucide-react';

interface Producto {
    id: number;
    nombre: string;
    sku?: string;
    activo: boolean;
}

interface Proveedor {
    id: number;
    nombre: string;
    telefono?: string;
    correo?: string;
    productos: Producto[];
}

interface Props {
    proveedor: Proveedor;
}

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Proveedores', href: '/inventario/proveedores' },
    { title: 'Detalle', href: `/inventario/proveedores/${id}` },
];

export default function ProveedorShow({ proveedor }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(proveedor.id)}>
            <Head title={`Proveedor: ${proveedor.nombre}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">
                            {proveedor.nombre}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {proveedor.correo || 'Sin correo'} ·{' '}
                            {proveedor.telefono || 'Sin teléfono'}
                        </p>
                    </div>

                    <Link
                        href={`/inventario/proveedores/${proveedor.id}/edit`}
                        className="px-4 py-2 bg-muted border border-border rounded-xl font-bold hover:bg-muted/80"
                    >
                        Editar
                    </Link>
                </div>

                {/* Productos */}
                <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                        <Package className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-foreground">
                            Productos del proveedor
                        </h2>
                    </div>

                    {proveedor.productos.length === 0 ? (
                        <div className="px-6 py-12 text-center text-muted-foreground">
                            Este proveedor no tiene productos asociados.
                            <div className="mt-4">
                                <Link
                                    href="/inventario/productos/create"
                                    className="text-lime-600 font-bold hover:underline"
                                >
                                    Crear producto
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
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">
                                            SKU
                                        </th>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground text-center">
                                            Estado
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {proveedor.productos.map((prod) => (
                                        <tr
                                            key={prod.id}
                                            className="hover:bg-muted/50"
                                        >
                                            <td className="px-6 py-4 font-medium">
                                                <Link
                                                    href={`/inventario/productos/${prod.id}`}
                                                    className="text-lime-600 hover:underline"
                                                >
                                                    {prod.nombre}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {prod.sku || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                                                        prod.activo
                                                            ? 'bg-lime-500/10 text-lime-600'
                                                            : 'bg-rose-500/10 text-rose-600'
                                                    }`}
                                                >
                                                    {prod.activo
                                                        ? 'Activo'
                                                        : 'Inactivo'}
                                                </span>
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
