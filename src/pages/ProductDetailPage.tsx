import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api';
import { Product } from '../types/Product';
import './ProductDetailPage.css'; // импорт стилей

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id!);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке продукта');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;
  if (!product) return <p>Продукт не найден</p>;

  return (
    <div className="product-detail-page">
      <h1>{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-detail-image"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
        }}
      />
      <p className="product-detail-price"><strong>Цена:</strong> ${product.price}</p>
      <p className="product-detail-description"><strong>Описание:</strong> {product.description}</p>
      <Link to="/" className="back-link">
        Назад к списку продуктов
      </Link>
    </div>
  );
};

export default ProductDetailPage;
