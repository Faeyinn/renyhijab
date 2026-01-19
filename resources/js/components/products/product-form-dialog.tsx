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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { type Product, type Category } from '@/types';

interface ProductFormDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    editingProduct: Product | null;
    data: {
        name: string;
        price: string;
        category_id: string;
    };
    setData: (field: string, value: string) => void;
    errors: Record<string, string>;
    processing: boolean;
    categories: Category[];
    onSubmit: (e: React.FormEvent) => void;
}

export function ProductFormDialog({
    isOpen,
    onOpenChange,
    editingProduct,
    data,
    setData,
    errors,
    processing,
    categories,
    onSubmit,
}: ProductFormDialogProps) {
    const isEditing = !!editingProduct;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-[#7A221D]">
                        {isEditing ? 'Edit Product' : 'Add Product'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update product information.' : 'Create a new product.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="name"
                                className="text-right text-stone-600"
                            >
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="col-span-3 border-[#A3362E]/20 focus-visible:ring-[#A3362E]"
                            />
                        </div>
                        {errors.name && (
                            <p className="col-span-4 ml-auto text-right text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="price"
                                className="text-right text-stone-600"
                            >
                                Price
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="col-span-3 border-[#A3362E]/20 focus-visible:ring-[#A3362E]"
                            />
                        </div>
                        {errors.price && (
                            <p className="col-span-4 ml-auto text-right text-sm text-red-500">
                                {errors.price}
                            </p>
                        )}

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="category"
                                className="text-right text-stone-600"
                            >
                                Category
                            </Label>
                            <div className="col-span-3">
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger className="border-[#A3362E]/20 focus:ring-[#A3362E]">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {errors.category_id && (
                            <p className="col-span-4 ml-auto text-right text-sm text-red-500">
                                {errors.category_id}
                            </p>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[#A3362E] text-white hover:bg-[#7A221D]"
                        >
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}