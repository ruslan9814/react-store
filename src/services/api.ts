// src/services/api.ts
import axios, { AxiosError } from 'axios';
import { Product, ProductRequest } from '../types/Product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5151/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/product');
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof AxiosError
          ? `Failed to fetch products: ${error.response?.data || error.message}`
          : 'Failed to fetch products'
      );
    }
  },

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get<Product>(`/product/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof AxiosError
          ? `Failed to fetch product: ${error.response?.data || error.message}`
          : 'Failed to fetch product'
      );
    }
  },

  async addProduct(productData: ProductRequest): Promise<Product> {
    try {
      const formData = new FormData();
      formData.append('name', productData.name.trim());
      formData.append('price', productData.price.toString());
      formData.append('description', productData.description.trim());
      if (productData.imageUrl) {
        formData.append('imageUrl', productData.imageUrl);
      } else {
        throw new Error('Image file is required');
      }

      const response = await api.post<Product>('/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof AxiosError
          ? `Failed to add product: ${error.response?.data || error.message}`
          : error instanceof Error
          ? error.message
          : 'Failed to add product'
      );
    }
  },

 async updateProduct(id: string, productData: ProductRequest): Promise<Product> {
  try {
    const formData = new FormData();
    formData.append('name', productData.name.trim());
    formData.append('price', productData.price.toString());
    formData.append('description', productData.description.trim());
    if (productData.imageUrl) {
      formData.append('imageUrl', productData.imageUrl);
    }

    const response = await api.put<Product>(`/product/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // здесь приходит обновленный продукт, а не строка
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? `Failed to update product: ${error.response?.data || error.message}`
        : 'Failed to update product'
    );
  }
},


 async deleteProduct(id: string): Promise<string> {
  try {
    const response = await api.delete<{ message: string }>(`/product/delete/${id}`);
    return response.data.message;  
  } catch (error) {
    throw new Error(
      error instanceof AxiosError
        ? `Failed to delete product: ${error.response?.data || error.message}`
        : 'Failed to delete product'
    );
  }
}

};

export default api;