import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../services/api';
import './EditProduct.css';
const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: null,
    });
    const [existingImageUrl, setExistingImageUrl] = useState(null);
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
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load product');
                console.error('Error loading product:', err);
            }
            finally {
                setFetching(false);
            }
        };
        loadProduct();
    }, [id]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({
            ...prev,
            imageUrl: file,
        }));
    };
    const handleSubmit = async (e) => {
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
            await productService.updateProduct(id, {
                name: formData.name.trim(),
                price,
                description: formData.description.trim(),
                imageUrl: formData.imageUrl || null,
            });
            alert('Product updated successfully!');
            navigate('/product'); // навигация к списку продуктов в единственном числе
        }
        catch (error) {
            alert(error instanceof Error ? error.message : 'Failed to update product');
            console.error('Error updating product:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
            navigate('/product');
        }
    };
    if (fetching) {
        return _jsx("div", { children: "Loading product..." });
    }
    if (error) {
        return (_jsxs("div", { className: "error", children: [_jsx("h2", { children: "Error" }), _jsx("p", { children: error }), _jsx("button", { onClick: () => navigate('/product'), className: "btn btn-primary", children: "Back to Products" })] }));
    }
    return (_jsxs("div", { className: "product-form-container", children: [_jsxs("div", { className: "form-header", children: [_jsx("h1", { children: "Edit Product" }), _jsx("button", { onClick: handleCancel, className: "cancel-btn", children: "\u2190 Back to List" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "product-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "name", children: "Product Name *" }), _jsx("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleInputChange, placeholder: "Enter product name", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "price", children: "Price *" }), _jsx("input", { type: "number", id: "price", name: "price", value: formData.price, onChange: handleInputChange, placeholder: "0.00", step: "0.01", min: "0", required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "description", children: "Description *" }), _jsx("textarea", { id: "description", name: "description", value: formData.description, onChange: handleInputChange, placeholder: "Enter product description", rows: 4, required: true })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { htmlFor: "imageUrl", children: "Image" }), _jsx("input", { type: "file", id: "imageUrl", name: "imageUrl", onChange: handleFileChange, accept: "image/*" }), (formData.imageUrl || existingImageUrl) && (_jsx("div", { className: "image-preview", children: _jsx("img", { src: formData.imageUrl instanceof File
                                        ? URL.createObjectURL(formData.imageUrl)
                                        : existingImageUrl || '', alt: "Preview", className: "preview-image" }) }))] }), _jsxs("div", { className: "form-actions", children: [_jsx("button", { type: "button", onClick: handleCancel, className: "btn btn-secondary", disabled: loading, children: "Cancel" }), _jsx("button", { type: "submit", className: "btn btn-primary", disabled: loading, children: loading ? 'Updating...' : 'Update Product' })] })] })] }));
};
export default EditProduct;
