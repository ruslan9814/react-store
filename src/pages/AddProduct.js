import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/api';
import './ProductForm.css';
const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: null,
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            imageUrl: file,
        }));
    };
    const handleSubmit = async (e) => {
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
        }
        catch (error) {
            alert(error instanceof Error ? error.message : 'Ошибка при добавлении продукта');
            console.error('Error adding product:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        if (window.confirm('Вы уверены, что хотите отменить? Все данные будут потеряны.')) {
            navigate('/product');
        }
    };
    return (_jsxs("div", { className: "product-form-container", children: [_jsxs("div", { className: "form-header", children: [_jsx("h1", { children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0434\u0443\u043A\u0442" }), _jsx("button", { onClick: handleCancel, className: "cancel-btn", children: "\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "product-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 *" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "price", children: "\u0426\u0435\u043D\u0430 *" }), _jsx("input", { type: "number", id: "price", name: "price", value: formData.price, onChange: handleInputChange, placeholder: "0.00", step: "0.01", min: "0", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "description", children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 *" }), _jsx("textarea", { id: "description", name: "description", value: formData.description, onChange: handleInputChange, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430", rows: 4, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "imageUrl", children: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 *" }), _jsx("input", { type: "file", id: "imageUrl", name: "imageUrl", onChange: handleFileChange, accept: "image/*", required: true }), formData.imageUrl && (_jsx("div", { className: "image-preview", children: _jsx("img", { src: URL.createObjectURL(formData.imageUrl), alt: "Preview", className: "preview-image" }) }))] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "button", onClick: handleCancel, className: "btn btn-secondary", disabled: loading, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: loading, children: loading ? 'Добавление...' : 'Добавить продукт' })] })] })] }));
};
export default AddProduct;
