import { Link } from '@inertiajs/react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { urlIsActive } = useActiveUrl();

    return (
        <SidebarGroup className="px-3 py-4">
            <SidebarGroupLabel className="mb-2 px-2 text-[10px] font-medium tracking-widest text-stone-400 uppercase">
                Platform Menu
            </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
                {items.map((item) => {
                    const active = urlIsActive(item.href);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={{ children: item.title }}
                                className={cn(
                                    'relative h-10 px-3 transition-all duration-300',
                                    active
                                        ? 'bg-red-50 font-semibold text-red-900 shadow-sm shadow-red-100/50'
                                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900',
                                )}
                            >
                                <Link
                                    href={item.href}
                                    prefetch
                                    className="flex items-center gap-3"
                                >
                                    {item.icon && (
                                        <item.icon
                                            className={cn(
                                                'size-5 transition-colors duration-300',
                                                active
                                                    ? 'text-red-800'
                                                    : 'text-stone-400',
                                            )}
                                        />
                                    )}
                                    <span className="flex-1">{item.title}</span>
                                    {active && (
                                        <div className="absolute top-2 bottom-2 left-0 w-1 rounded-r-full bg-red-800" />
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
