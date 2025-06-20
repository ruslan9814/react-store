import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api';
import './ProductDetailPage.css'; // импорт стилей
const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id);
                setProduct(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Ошибка при загрузке продукта');
            }
            finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);
    if (loading)
        return _jsx("p", { children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..." });
    if (error)
        return _jsxs("p", { children: ["\u041E\u0448\u0438\u0431\u043A\u0430: ", error] });
    if (!product)
        return _jsx("p", { children: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" });
    return (_jsxs("div", { className: "product-detail-page", children: [_jsx("h1", { children: product.name }), _jsx("img", { src: product.imageUrl, alt: product.name, className: "product-detail-image", onError: (e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                } }), _jsxs("p", { className: "product-detail-price", children: [_jsx("strong", { children: "\u0426\u0435\u043D\u0430:" }), " $", product.price] }), _jsxs("p", { className: "product-detail-description", children: [_jsx("strong", { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435:" }), " ", product.description] }), _jsx(Link, { to: "/", className: "back-link", children: "\u041D\u0430\u0437\u0430\u0434 \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432" })] }));
};
export default ProductDetailPage;
