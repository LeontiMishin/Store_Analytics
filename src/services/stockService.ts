import { Product, Review, DiscountRule } from "src/model/Types";

export function calculateAvailable(product: Product): number {
  return product.warehouses.reduce((sum, w) => sum + w.quantity, 0);
} 

export function getStockStatus(quantity: number): string {
  if (quantity === 0) return "OUT";
  if (quantity <= 2) return "LOW";
  return "IN_STOCK";
}

export function calculateAverageRating(
  productId: string,
  reviews: Review[]
): number | null {
  const productReviews = reviews.filter(r => r.productId === productId);
  if (productReviews.length === 0) return null;
  const avg =
    productReviews.reduce((sum, r) => sum + r.rating, 0) /
    productReviews.length;
  return avg;
}

export function applyDiscount(
  product: Product,
  avgRating: number | null,
  rules: DiscountRule[]
): { original: number; discounted?: number } {
  const rule = rules.find(r => r.category === product.category);
  if (!rule) return { original: product.basePrice };
  if (rule.minRating !== undefined) {
    if (avgRating === null || avgRating < rule.minRating) {
      return { original: product.basePrice };
    }
  }
  const discounted = product.basePrice * (1 - rule.percent);
  return { original: product.basePrice, discounted };
}

export function formatPrice(value: number): string {
  return value.toFixed(2); 
}