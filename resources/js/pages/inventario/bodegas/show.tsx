import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Bodega {
    id: number;
    nombre: string;
    ubicacion?: string;
    descripcion?: string;
    activo: boolean;
}

interface Props {
    bodega: Bodega;
    productos: any[];
}

export default function BodegaShow({ bodega, productos }: Props) {
    return (
        <AppLayout>
            <Head title={`Bodega ${bodega.nombre}`} />

            <div className="p-6 flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold">{bodega.nombre}</h1>
                    <p className="text-muted-foreground">{bodega.ubicacion}</p>
                    <p className="mt-2">{bodega.descripcion}</p>
                </div>

                <div className="bg-card border rounded-2xl p-4">
                    <h2 className="text-lg font-bold mb-2">Productos</h2>

                    {productos.length === 0 ? (
                        <p className="text-muted-foreground">
                            Esta bodega aún no tiene productos asignados.
                        </p>
                    ) : (
                        <ul>
                            {/* futuro listado */}
                        </ul>
                    )}
                </div>

                <Link
                    href="/inventario/bodegas"
                    className="text-lime-600 font-bold"
                >
                    ← Volver a bodegas
                </Link>
            </div>
        </AppLayout>
    );
}
