import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Plus, Pencil, Trash } from 'lucide-react';

interface Proveedor {
    id: number;
    nombre: string;
    telefono?: string;
    correo?: string;
    activo: boolean;
}

interface Props {
    proveedores: Proveedor[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Proveedores', href: '/inventario/proveedores' },
];

export default function ProveedoresIndex({ proveedores }: Props) {
    const handleDelete = (proveedor: Proveedor) => {
        if (confirm(`¿Estás seguro de desactivar al proveedor "${proveedor.nombre}"?`)) {
            router.delete(`/inventario/proveedores/${proveedor.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Opcional: mostrar notificación de éxito
                    console.log('Proveedor desactivado correctamente');
                },
                onError: (errors) => {
                    // Opcional: mostrar errores
                    console.error('Error al desactivar:', errors);
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proveedores" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-foreground">Proveedores</h1>
                    <Link
                        href="/inventario/proveedores/create"
                        className="flex items-center gap-2 px-4 py-2 bg-lime-500 text-white font-bold rounded-xl hover:bg-lime-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Proveedor
                    </Link>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Nombre</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Teléfono</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Correo</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {proveedores.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                            No hay proveedores registrados
                                        </td>
                                    </tr>
                                ) : (
                                    proveedores.map((prov) => (
                                        <tr key={prov.id} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-6 py-4 text-sm font-medium text-foreground">{prov.nombre}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">{prov.telefono || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">{prov.correo || '-'}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${
                                                    prov.activo 
                                                        ? 'bg-lime-500/10 text-lime-600 border-lime-500/20' 
                                                        : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                                                }`}>
                                                    {prov.activo ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <Link 
                                                        href={`/inventario/proveedores/${prov.id}/edit`}
                                                        className="p-2 text-teal-500 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-950 rounded-lg transition-colors"
                                                        title="Editar proveedor"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    
                                                    {prov.activo && (
                                                        <button 
                                                            onClick={() => handleDelete(prov)}
                                                            className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                                                            title="Desactivar proveedor"
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