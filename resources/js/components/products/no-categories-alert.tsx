import { AlertTriangle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface NoCategoriesAlertProps {
    categoriesCount: number;
}

export function NoCategoriesAlert({ categoriesCount }: NoCategoriesAlertProps) {
    if (categoriesCount > 0) return null;

    return (
        <Alert className="border-l-4 border-orange-200 border-l-orange-500 bg-orange-50 text-orange-900">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertTitle>Peringatan</AlertTitle>
            <AlertDescription>
                Belum ada kategori yang tersedia.{' '}
                <a
                    href="/categories"
                    className="font-medium underline underline-offset-4 hover:text-orange-700"
                >
                    Tambah kategori terlebih dahulu
                </a>
            </AlertDescription>
        </Alert>
    );
}