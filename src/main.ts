import type { Supplier } from "./data/Supplier";
import { Category } from "./data/Category";

interface StockEntry {
    warehouse: string;
    quantity: number;
}

interface Review {
    user: string;
    rating: number;
    comment?: string;
}

interface Product {
    id: number;
    name: string;
    category: Category;
    supplier: Supplier;
    price: number;
    stock: StockEntry[];
    reviews?: Review[];
    specs?: Record<string, string>;
}

interface DiscountRule {
    category: Category;
    percent: number;
    minRating?: number;
}

const supplier: Supplier = {
    id: 1,
    name: "Tech Supplies Inc.",
};

const otherSupplier: Supplier = {
    id: 2,
    name: "Books & More",
};

const discountRules: DiscountRule[] = [
    { category: Category.Electronics, percent: 20, minRating: 4.0 },
    { category: Category.Books, percent: 10 },
];

const products: Product[] = [
    {
        id: 1,
        name: "Wireless Mouse",
        category: Category.Electronics,
        supplier,
        price: 25,
        stock: [
            { warehouse: "Tallinn", quantity: 2 },
            { warehouse: "Tartu", quantity: 1 },
        ],
        reviews: [
            { user: "Alice", rating: 5 },
            { user: "Bob", rating: 4 },
        ],
        specs: { color: "black", connectivity: "wireless" },
    },
    {
        id: 2,
        name: "USB-C Cable",
        category: Category.Electronics,
        supplier,
        price: 10.5,
        stock: [
            { warehouse: "Tallinn", quantity: 0 },
            { warehouse: "Tartu", quantity: 0 },
        ],
    },
    {
        id: 3,
        name: "Novel: The Great Adventure",
        category: Category.Books,
        supplier: otherSupplier,
        price: 15.99,
        stock: [
            { warehouse: "Tallinn", quantity: 1 },
        ],
        reviews: [
            { user: "Reader1", rating: 3 },
        ],
        specs: { pages: "320", language: "EN" },
    },
    {
        id: 4,
        name: "Socks (Pair)",
        category: Category.Clothing,
        supplier: otherSupplier,
        price: 5,
        stock: [
            { warehouse: "Tallinn", quantity: 2 },
        ],
    },
];