import { Supplier, Product, Review, DiscountRule } from "../model/Types"; 

export const suppliers: Supplier[] = [
  { id: "SUP-1", name: "Nordic Devices" },
  { id: "SUP-2", name: "Euro Accessories" },
  { id: "SUP-3", name: "Baltic Books" },
]; 

export const products: Product[] = [
  {
    id: "LAP-DEL-XPS15",
    name: "Dell XPS 15",
    category: "Electronics",
    supplierId: "SUP-1",
    basePrice: 1299.99,
    warehouses: [
      { warehouseId: "WH-1", quantity: 2 },
      { warehouseId: "WH-2", quantity: 1 },
    ],
    specs: {
      cpu: "Intel i7",
      ram: 16,
      storage: 512,
      weight: 1.8,
    },
  },
  {
    id: "ACC-LOG-MX3",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    supplierId: "SUP-2",
    basePrice: 99.5,
    warehouses: [
      { warehouseId: "WH-1", quantity: 4 },
      { warehouseId: "WH-2", quantity: 5 },
    ],
  },
  {
    id: "BOOK-TS-BASICS",
    name: "TypeScript for Beginners",
    category: "Books",
    supplierId: "SUP-3",
    basePrice: 39.99,
    warehouses: [{ warehouseId: "WH-1", quantity: 1 }],
    specs: {
      pages: 320,
      language: "EN",
    },
  },
  {
    id: "ACC-USB-C-HUB",
    name: "USB-C Hub 8-in-1",
    category: "Accessories",
    supplierId: "SUP-2",
    basePrice: 59.0,
    warehouses: [],
    specs: {
      ports: 8,
      usbVersion: "USB 3.2",
    },
  },
];

export const reviews: Review[] = [
  { productId: "LAP-DEL-XPS15", rating: 5 },
  { productId: "LAP-DEL-XPS15", rating: 4 },
  { productId: "ACC-LOG-MX3", rating: 3 },
  { productId: "ACC-LOG-MX3", rating: 3 },
  { productId: "ACC-LOG-MX3", rating: 5 },
  { productId: "BOOK-TS-BASICS", rating: 3 },
];

export const discountRules: DiscountRule[] = [
  { category: "Electronics", percent: 0.1, minRating: 4 },
  { category: "Accessories", percent: 0.15 },
];