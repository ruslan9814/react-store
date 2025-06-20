import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
const DeleteProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleDelete = async () => {
        if (!id)
            return;
        setLoading(true);
        try {
            await productService.deleteProduct(id);
            alert('Продукт успешно удалён');
            navigate('/product');
        }
        catch (err) {
            setError('Ошибка при удалении продукта');
        }
        finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        navigate(-1);
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442" }), error && _jsx("p", { style: { color: 'red' }, children: error }), _jsxs("p", { children: ["\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442 \u0441 ID: ", id, "?"] }), _jsx("button", { onClick: handleDelete, disabled: loading, children: loading ? 'Удаление...' : 'Да, удалить' }), _jsx("button", { onClick: handleCancel, disabled: loading, children: "\u041E\u0442\u043C\u0435\u043D\u0430" })] }));
};
export default DeleteProduct;
