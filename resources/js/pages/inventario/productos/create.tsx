import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

interface Proveedor {
    id: number;
    nombre: string;
}

interface Props {
    proveedores: Proveedor[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Productos', href: '/inventario/productos' },
    { title: 'Nuevo', href: '/inventario/productos/create' },
];

export default function ProductoCreate({ proveedores }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        sku: '',
        descripcion: '',
        activo: true,
        proveedor_id: '',
        sin_proveedor: false,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/inventario/productos');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nuevo Producto" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <h1 className="text-2xl font-bold text-foreground">
                    Crear Producto
                </h1>

                <form
                    onSubmit={submit}
                    className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col gap-4 max-w-lg"
                >
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-bold mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) =>
                                setData('nombre', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-lime-500"
                        />
                        {errors.nombre && (
                            <p className="text-sm text-rose-500">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-sm font-bold mb-1">
                            SKU
                        </label>
                        <input
                            type="text"
                            value={data.sku}
                            onChange={(e) =>
                                setData('sku', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-lime-500"
                        />
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-bold mb-1">
                            Descripción
                        </label>
                        <textarea
                            value={data.descripcion}
                            onChange={(e) =>
                                setData('descripcion', e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-lime-500"
                        />
                    </div>

                    {/* Proveedor */}
                    {proveedores.length === 0 ? (
                        <div className="bg-muted p-4 rounded-xl text-sm border border-border">
                            No hay proveedores registrados.
                            <Link
                                href="/inventario/proveedores/create"
                                className="ml-2 text-lime-600 font-bold hover:underline"
                            >
                                Crear proveedor
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-bold mb-1">
                                    Proveedor
                                </label>
                                <select
                                    value={data.proveedor_id}
                                    disabled={data.sin_proveedor}
                                    onChange={(e) =>
                                        setData(
                                            'proveedor_id',
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-lime-500 disabled:bg-muted"
                                >
                                    <option value="">
                                        Seleccione un proveedor
                                    </option>
                                    {proveedores.map((prov) => (
                                        <option
                                            key={prov.id}
                                            value={prov.id}
                                        >
                                            {prov.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.sin_proveedor}
                                    onChange={(e) => {
                                        setData(
                                            'sin_proveedor',
                                            e.target.checked
                                        );
                                        if (e.target.checked) {
                                            setData('proveedor_id', '');
                                        }
                                    }}
                                />
                                <label className="text-sm font-medium">
                                    Crear producto sin proveedor
                                </label>
                            </div>
                        </>
                    )}

                    {/* Activo */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) =>
                                setData('activo', e.target.checked)
                            }
                        />
                        <label className="text-sm font-medium">
                            Activo
                        </label>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-2 mt-4">
                        <Link
                            href="/inventario/productos"
                            className="px-4 py-2 bg-muted border border-border rounded-xl font-bold"
                        >
                            Cancelar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-lime-500 text-white rounded-xl font-bold hover:bg-lime-600 disabled:opacity-50"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
