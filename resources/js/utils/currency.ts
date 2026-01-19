/**
 * Format currency values to Indonesian Rupiah
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);
}

/**
 * Parse currency string back to number
 */
export function parseCurrency(value: string): number {
    // Remove currency symbol and formatting
    const cleanValue = value.replace(/[^\d,-]/g, '').replace(',', '.');
    return parseFloat(cleanValue) || 0;
}