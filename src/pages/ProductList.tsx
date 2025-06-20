import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import { Product } from '../types/Product';
import './ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке продуктов');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
      try {
        await productService.deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
        alert('Продукт успешно удален');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Ошибка при удалении продукта');
        console.error('Error deleting product:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка продуктов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button onClick={loadProducts} className="retry-btn">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="page-header">
        <h1>Все продукты</h1>
        <Link to="/add-product" className="add-btn">
          Добавить продукт
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <h2>Нет продуктов</h2>
          <p>Начните с добавления первого продукта</p>
          <Link to="/add-product" className="add-btn">
            Добавить продукт
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/300x200?text=No+Image';
                  }}
                />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <p className="product-description">
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>
              </div>
              <div className="product-actions">
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  Подробнее
                </Link>
                <Link to={`/edit-product/${product.id}`} className="btn btn-secondary">
                  Изменить
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-danger"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
