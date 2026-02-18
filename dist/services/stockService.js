export function calculateAvailable(product) {
    return product.warehouses.reduce((sum, w) => sum + w.quantity, 0);
}
export function getStockStatus(quantity) {
    if (quantity === 0)
        return "OUT";
    if (quantity <= 2)
        return "LOW";
    return "IN_STOCK";
}
export function calculateAverageRating(productId, reviews) {
    const productReviews = reviews.filter(r => r.productId === productId);
    if (productReviews.length === 0)
        return null;
    const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) /
        productReviews.length;
    return avg;
}
export function applyDiscount(product, avgRating, rules) {
    const rule = rules.find(r => r.category === product.category);
    if (!rule)
        return { original: product.basePrice };
    if (rule.minRating !== undefined) {
        if (avgRating === null || avgRating < rule.minRating) {
            return { original: product.basePrice };
        }
    }
    const discounted = product.basePrice * (1 - rule.percent);
    return { original: product.basePrice, discounted };
}
export function formatPrice(value) {
    return value.toFixed(2);
}
