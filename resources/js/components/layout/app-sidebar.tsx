import { Link, usePage } from '@inertiajs/react';
import { Folder, LayoutGrid, Receipt, ShoppingBag, Users } from 'lucide-react';

import { NavFooter } from '@/components/navigation/nav-footer';
import { NavMain } from '@/components/navigation/nav-main';
import { NavUser } from '@/components/navigation/nav-user';
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
import { type NavItem, type SharedData } from '@/types';

import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: Folder,
    },
    {
        title: 'Customers',
        href: '/customers',
        icon: Users,
    },
    {
        title: 'Products',
        href: '/products',
        icon: ShoppingBag,
    },
    {
        title: 'Transactions',
        href: '/transactions',
        icon: Receipt,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 11) return 'Selamat Pagi';
        if (hour >= 11 && hour < 15) return 'Selamat Siang';
        if (hour >= 15 && hour < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <Sidebar
            collapsible="icon"
            variant="inset"
            className="border-r-0 bg-stone-50/50"
        >
            {/* Decorative background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute -top-[10%] -left-[10%] size-40 rounded-full bg-red-100/50 blur-3xl" />
                <div className="absolute top-[40%] -right-[15%] size-60 rounded-full bg-stone-100/30 blur-3xl" />
            </div>

            <SidebarHeader className="relative z-10 px-4 pt-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            asChild
                            className="h-auto p-0 hover:bg-transparent"
                        >
                            <Link
                                href={dashboard()}
                                prefetch
                                className="flex items-center gap-3"
                            >
                                <div className="flex size-10 items-center justify-center rounded-xl bg-red-900 shadow-lg shadow-red-200">
                                    <AppLogo iconOnly />
                                </div>
                                <div className="flex flex-col gap-0.5 group-data-[collapsible=icon]:hidden">
                                    <span className="text-lg font-bold tracking-tight text-red-950">
                                        Renyhijab
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-widest text-red-900/60 uppercase">
                                        Management System
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="scrollbar-none relative z-10 mt-4 h-full">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="relative z-10 border-t border-red-100/50 bg-white/40 p-4 backdrop-blur-sm">
                <div className="mb-4 px-2 group-data-[collapsible=icon]:hidden">
                    <div className="rounded-xl bg-gradient-to-br from-red-800 to-red-950 p-4 shadow-md shadow-red-200">
                        <p className="mb-1 text-xs font-medium text-red-100/80">
                            {getGreeting()},
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="mr-2 truncate text-sm font-bold text-white">
                                {auth.user.name.split(' ')[0]}
                            </span>
                            <div className="size-2 shrink-0 animate-pulse rounded-full bg-green-400" />
                        </div>
                    </div>
                </div>
                <NavFooter items={footerNavItems} />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
