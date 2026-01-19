import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';

interface PageHeaderAction {
    label: string;
    href?: string;
    icon?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: PageHeaderAction;
    children?: ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    description,
    action,
    children,
    className = '',
}: PageHeaderProps) {
    return (
        <div className={`flex items-center justify-between ${className}`}>
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 text-sm text-stone-500">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-4">
                {children}
                {action &&
                    (action.onClick ? (
                        <Button
                            onClick={action.onClick}
                            disabled={action.disabled}
                            className="bg-red-900 text-white shadow-md shadow-red-900/10 transition-all hover:bg-red-950 hover:shadow-lg active:scale-[0.98]"
                        >
                            {action.icon || <Plus className="mr-2 h-4 w-4" />}
                            {action.label}
                        </Button>
                    ) : (
                        <Button
                            asChild
                            disabled={action.disabled}
                            className="bg-red-900 text-white shadow-md shadow-red-900/10 transition-all hover:bg-red-950 hover:shadow-lg active:scale-[0.98]"
                        >
                            <Link href={action.href || '#'}>
                                {action.icon || (
                                    <Plus className="mr-2 h-4 w-4" />
                                )}
                                {action.label}
                            </Link>
                        </Button>
                    ))}
            </div>
        </div>
    );
}
