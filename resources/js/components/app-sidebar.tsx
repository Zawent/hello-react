import { useState } from 'react';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Package,
    FileText,
    Receipt,
    BarChart3,
    Settings,
    Rocket,
    ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* 🔹 NAV ITEMS */
const mainNavItems: NavItem[] = [
    {
        title: 'Panel Principal',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventario',
        icon: Package,
        children: [
            {
                title: 'Productos',
                href: '/inventario/productos',
            },
            {
                title: 'Movimientos',
                href: '/inventario/movimientos',
            },
            {
                title: 'Proveedores',
                href: '/inventario/proveedores',
            },
            {
                title: 'Bodegas',
                href: '/inventario/bodegas',
            },
        ],
    },
    {
        title: 'Contratos',
        href: '/contracts',
        icon: FileText,
    },
    {
        title: 'Facturación',
        href: '/billing',
        icon: Receipt,
    },
    {
        title: 'Reportes',
        href: '/reports',
        icon: BarChart3,
    },
    {
        title: 'Configuración',
        href: '/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    const { url } = usePage();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

    // Toggle menú desplegable
    const toggleMenu = (title: string) => {
        setOpenMenus(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    // Verificar si algún hijo está activo (para abrir automáticamente)
    const hasActiveChild = (children?: NavItem[]) => {
        if (!children) return false;
        return children.some(child => 
            child.href && (url === child.href || url.startsWith(child.href + '/'))
        );
    };

    return (
        <Sidebar collapsible="icon" className="border-r-0 bg-[#0a1439]">
            {/* Header */}
            <SidebarHeader className="border-b-0 p-8">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="hover:bg-transparent data-[state=collapsed]:p-0"
                        >
                            <Link href={dashboard()} className="flex items-center gap-3">
                                <div className="bg-[#e58346] p-2 rounded-xl shadow-lg shadow-[#e58346]/20 shrink-0">
                                    <Rocket className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-white text-2xl font-bold tracking-tight group-data-[collapsible=icon]:hidden">
                                    Gesto<span className="text-[#acc55f]">Agile</span>
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-4 mt-4">
                <SidebarMenu className="space-y-2">
                    {mainNavItems.map((item) => {
                        const Icon = item.icon;
                        const isGroup = !!item.children;
                        const isActive = item.href && (url === item.href || url.startsWith(item.href + '/'));
                        const hasActive = hasActiveChild(item.children);
                        const isOpen = openMenus[item.title] ?? hasActive;

                        /* 🔹 MENÚ CON HIJOS (DESPLEGABLE) */
                        if (isGroup) {
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <div>
                                        {/* Botón principal */}
                                        <button
                                            onClick={() => toggleMenu(item.title)}
                                            className={cn(
                                                'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all',
                                                hasActive
                                                    ? 'bg-white/10 text-white font-semibold'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            )}
                                        >
                                            {Icon && <Icon className="w-6 h-6 shrink-0" />}
                                            <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                                                {item.title}
                                            </span>
                                            <ChevronDown 
                                                className={cn(
                                                    "w-4 h-4 opacity-70 transition-transform duration-500 ease-in-out group-data-[collapsible=icon]:hidden",
                                                    isOpen && "rotate-180"
                                                )}
                                            />
                                        </button>

                                        {/* Submenu (desplegable) */}
                                        <div 
                                            className={cn(
                                                "ml-8 mt-2 space-y-1 overflow-hidden transition-all duration-500 ease-in-out group-data-[collapsible=icon]:hidden",
                                                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                            )}
                                        >
                                            {item.children?.map((child) => {
                                                const isChildActive = child.href && (
                                                    url === child.href || 
                                                    url.startsWith(child.href + '/')
                                                );

                                                return (
                                                    <Link
                                                        key={child.title}
                                                        href={child.href!}
                                                        className={cn(
                                                            'block px-4 py-2 rounded-lg text-sm transition-all',
                                                            isChildActive
                                                                ? 'bg-white/10 text-white font-semibold'
                                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                        )}
                                                    >
                                                        {child.title}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </SidebarMenuItem>
                            );
                        }

                        /* 🔹 ITEMS NORMALES (SIN HIJOS) */
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className={cn(
                                        'px-4 py-3.5 rounded-xl transition-all h-auto',
                                        isActive
                                            ? 'bg-white/10 text-white font-semibold hover:bg-white/10'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    <Link href={item.href!}>
                                        {Icon && <Icon className="w-6 h-6 shrink-0" />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-6 border-t border-white/5 mt-auto">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}