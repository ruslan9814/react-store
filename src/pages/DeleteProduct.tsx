import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';

const DeleteProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await productService.deleteProduct(id);
      alert('Продукт успешно удалён');
      navigate('/product');
    } catch (err) {
      setError('Ошибка при удалении продукта');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div>
      <h2>Удалить продукт</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Вы уверены, что хотите удалить продукт с ID: {id}?</p>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Удаление...' : 'Да, удалить'}
      </button>
      <button onClick={handleCancel} disabled={loading}>
        Отмена
      </button>
    </div>
  );
};

export default DeleteProduct;
