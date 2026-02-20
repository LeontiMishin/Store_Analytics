export interface Supplier { 
  id: string; 
  name: string; 
} 

export interface WarehouseStock { 
  warehouseId: string; 
  quantity: number; 
} 

export interface Review { 
  productId: string; 
  rating: number; 
} 

export interface DiscountRule { 
  category: string; 
  percent: number; 
  minRating?: number; 
} 

export interface Product { 
  id: string; 
  name: string; 
  category: string; 
  supplierId: string; 
  basePrice: number; 
  warehouses: WarehouseStock[]; 
  specs?: Record<string, string | number>; 
} 