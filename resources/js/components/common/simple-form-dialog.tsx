import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type FormField } from '@/types';

interface SimpleFormDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    fields: FormField[];
    data: Record<string, string>;
    setData: (field: string, value: string) => void;
    errors: Record<string, string>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    submitLabel?: string;
}

export function SimpleFormDialog({
    isOpen,
    onOpenChange,
    title,
    description,
    fields,
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel = 'Save',
}: SimpleFormDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-bold text-red-950">
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        {fields.map((field) => (
                            <div
                                key={field.name}
                                className="grid grid-cols-4 items-start gap-4"
                            >
                                <Label
                                    htmlFor={field.name}
                                    className="pt-2 text-right text-stone-600"
                                >
                                    {field.label}
                                </Label>
                                <div className="col-span-3">
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.name}
                                            value={data[field.name] || ''}
                                            onChange={(e) =>
                                                setData(
                                                    field.name,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={field.placeholder}
                                            rows={3}
                                            className="flex min-h-[80px] w-full rounded-md border border-red-100 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    ) : (
                                        <Input
                                            id={field.name}
                                            type={field.type || 'text'}
                                            value={data[field.name] || ''}
                                            onChange={(e) =>
                                                setData(
                                                    field.name,
                                                    e.target.value,
                                                )
                                            }
                                            placeholder={field.placeholder}
                                            className="border-red-100 focus-visible:border-red-600 focus-visible:ring-red-600"
                                        />
                                    )}
                                    {errors[field.name] && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-red-900 text-white shadow-lg shadow-red-200/50 hover:bg-red-950"
                        >
                            {submitLabel}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
