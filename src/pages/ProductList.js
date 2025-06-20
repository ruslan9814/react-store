import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/api';
import './ProductList.css';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadProducts();
    }, []);
    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts();
            setProducts(data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка при загрузке продуктов');
            console.error('Error loading products:', err);
        }
        finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
            try {
                await productService.deleteProduct(id);
                setProducts(products.filter((p) => p.id !== id));
                alert('Продукт успешно удален');
            }
            catch (err) {
                alert(err instanceof Error ? err.message : 'Ошибка при удалении продукта');
                console.error('Error deleting product:', err);
            }
        }
    };
    if (loading) {
        return (_jsxs("div", { className: "loading", children: [_jsx("div", { className: "spinner" }), _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432..." })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "error", children: [_jsx("h2", { children: "\u041E\u0448\u0438\u0431\u043A\u0430" }), _jsx("p", { children: error }), _jsx("button", { onClick: loadProducts, className: "retry-btn", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430" })] }));
    }
    return (_jsxs("div", { className: "product-list", children: [_jsxs("div", { className: "page-header", children: [_jsx("h1", { children: "\u0412\u0441\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B" }), _jsx(Link, { to: "/add-product", className: "add-btn", children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442" })] }), products.length === 0 ? (_jsxs("div", { className: "empty-state", children: [_jsx("h2", { children: "\u041D\u0435\u0442 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432" }), _jsx("p", { children: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0441 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430" }), _jsx(Link, { to: "/add-product", className: "add-btn", children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442" })] })) : (_jsx("div", { className: "products-grid", children: products.map((product) => (_jsxs("div", { className: "product-card", children: [_jsx("div", { className: "product-image", children: _jsx("img", { src: product.imageUrl, alt: product.name, onError: (e) => {
                                    e.target.src =
                                        'https://via.placeholder.com/300x200?text=No+Image';
                                } }) }), _jsxs("div", { className: "product-info", children: [_jsx("h3", { className: "product-name", children: product.name }), _jsxs("p", { className: "product-price", children: ["$", product.price] }), _jsx("p", { className: "product-description", children: product.description.length > 100
                                        ? `${product.description.substring(0, 100)}...`
                                        : product.description })] }), _jsxs("div", { className: "product-actions", children: [_jsx(Link, { to: `/product/${product.id}`, className: "btn btn-primary", children: "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435" }), _jsx(Link, { to: `/edit-product/${product.id}`, className: "btn btn-secondary", children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C" }), _jsx("button", { onClick: () => handleDelete(product.id), className: "btn btn-danger", children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" })] })] }, product.id))) }))] }));
};
export default ProductList;
