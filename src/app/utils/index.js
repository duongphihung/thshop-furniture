export function formatCurrency(amount) {
    const formattedNumber = amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    const replacedText = formattedNumber.replace('₫', 'VNĐ');
    return replacedText;
}

export const statusProduct = [
    "Selling",
    "New",
    "OnSale",
    "OutOfStock",
    "Block"
]