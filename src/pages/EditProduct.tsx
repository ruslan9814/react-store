import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../services/api';
import { ProductFormData } from '../types/Product';
import './EditProduct.css';

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    description: '',
    imageUrl: null,
  });
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID');
      setFetching(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setFetching(true);
        const product = await productService.getProductById(id);
        setFormData({
          name: product.name,
          price: product.price.toString(),
          description: product.description,
          imageUrl: null,
        });
        setExistingImageUrl(product.imageUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
        console.error('Error loading product:', err);
      } finally {
        setFetching(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      imageUrl: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price || !formData.description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price');
      return;
    }

    try {
      setLoading(true);
      await productService.updateProduct(id!, {
        name: formData.name.trim(),
        price,
        description: formData.description.trim(),
        imageUrl: formData.imageUrl || null,
      });
      alert('Product updated successfully!');
      navigate('/product'); // навигация к списку продуктов в единственном числе
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to update product');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      navigate('/product');
    }
  };

  if (fetching) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/product')} className="btn btn-primary">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-form-container">
      <div className="form-header">
        <h1>Edit Product</h1>
        <button onClick={handleCancel} className="cancel-btn">
          ← Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price *</label>
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
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image</label>
          <input
            type="file"
            id="imageUrl"
            name="imageUrl"
            onChange={handleFileChange}
            accept="image/*"
          />
          {(formData.imageUrl || existingImageUrl) && (
            <div className="image-preview">
              <img
                src={
                  formData.imageUrl instanceof File
                    ? URL.createObjectURL(formData.imageUrl)
                    : existingImageUrl || ''
                }
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
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
