// src/types/Product.ts
export interface Product {
  id: string; // Guid as string in frontend
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface ProductRequest {
  name: string;
  price: number;
  description: string;
  imageUrl: File | null;
}

export interface ProductFormData {
  name: string;
  price: string; // String for form input
  description: string;
  imageUrl: File | null;
}