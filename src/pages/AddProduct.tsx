 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import { ProductFormData } from '../types/Product';
import './ProductForm.css';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    imageUrl: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      imageUrl: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!formData.imageUrl) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert('Пожалуйста, введите корректную цену');
      return;
    }

    try {
      setLoading(true);
      await productService.addProduct({
        name: formData.name.trim(),
        price,
        description: formData.description.trim(),
        imageUrl: formData.imageUrl,
      });
      alert('Продукт успешно добавлен!');
      navigate('/product');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Ошибка при добавлении продукта');
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Вы уверены, что хотите отменить? Все данные будут потеряны.')) {
      navigate('/product');
    }
  };

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>Добавить новый продукт</h1>
        <button onClick={handleCancel} className="cancel-btn">
          ← Назад к списку
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Название продукта *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Введите название продукта"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Цена *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Введите описание продукта"
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Изображение *</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          {formData.imageUrl && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(formData.imageUrl)}
                alt="Preview"
                className="preview-image"
              />
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Добавление...' : 'Добавить продукт'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;