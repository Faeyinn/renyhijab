import { Eye, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { type ActionButton } from '@/types';

interface ActionButtonsProps {
    actions: ActionButton[];
    className?: string;
}

export function ActionButtons({ actions, className = '' }: ActionButtonsProps) {
    return (
        <div className={`flex items-center justify-end gap-1 ${className}`}>
            {actions.map((action, index) => (
                <Button
                    key={index}
                    variant={action.variant || 'ghost'}
                    size={action.size || 'icon'}
                    onClick={action.onClick}
                    className={action.className}
                    title={action.label}
                >
                    {action.icon}
                </Button>
            ))}
        </div>
    );
}

// Predefined action button helpers
export function createViewAction(onClick: () => void): ActionButton {
    return {
        label: 'View',
        icon: <Eye className="h-4 w-4" />,
        variant: 'ghost',
        size: 'icon',
        onClick,
        className: 'text-red-800 hover:bg-red-50 hover:text-red-900',
    };
}

export function createEditAction(onClick: () => void): ActionButton {
    return {
        label: 'Edit',
        icon: <Pencil className="h-4 w-4" />,
        variant: 'ghost',
        size: 'icon',
        onClick,
        className: 'text-red-800 hover:bg-red-50 hover:text-red-900',
    };
}

export function createDeleteAction(onClick: () => void): ActionButton {
    return {
        label: 'Delete',
        icon: <Trash2 className="h-4 w-4" />,
        variant: 'ghost',
        size: 'icon',
        onClick,
        className: 'text-red-500 hover:bg-red-50 hover:text-red-600',
    };
}
