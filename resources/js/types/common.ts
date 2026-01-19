export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface FormField {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

export interface Column<T> {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
}

export interface ActionButton {
    label: string;
    icon: React.ReactNode;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    onClick: () => void;
    className?: string;
}