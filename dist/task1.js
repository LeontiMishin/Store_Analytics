import { products, suppliers, reviews, discountRules } from "./data/storeData.js";
import { calculateAvailable, getStockStatus, calculateAverageRating, applyDiscount, formatPrice, } from "./services/stockService.js";
console.log("Live reload enabled.");
console.log("Products:");
products.forEach(product => {
    const supplier = suppliers.find(s => s.id === product.supplierId);
    const available = calculateAvailable(product);
    const stockStatus = getStockStatus(available);
    const avgRating = calculateAverageRating(product.id, reviews);
    const priceInfo = applyDiscount(product, avgRating, discountRules);
    const ratingText = avgRating === null ? "no reviews" : formatPrice(avgRating);
    let priceText = `price: ${formatPrice(priceInfo.original)}`;
    if (priceInfo.discounted !== undefined) {
        priceText = `price: ${formatPrice(priceInfo.original)} -> ${formatPrice(priceInfo.discounted)}`;
    }
    const specsText = product.specs ? ` | specs: ${Object.entries(product.specs).map(([k, v]) => `${k}=${v}`).join(", ")}` : "";
    console.log(`- ${product.name} [${product.id}] | ${product.category} | supplier: ${supplier?.name} 
    | available: ${available} (${stockStatus}) | rating: ${ratingText}${specsText} | ${priceText}`);
});
