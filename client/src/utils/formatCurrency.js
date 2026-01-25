export const formatPrice = (price) => {
    const safePrice = price || 0;
    return safePrice.toLocaleString('en-IN', {
        style:'currency',
        currency:'INR',
        maximumFractionDigits:0,
    });
};