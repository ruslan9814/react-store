import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct'; // <-- импортируем EditProduct
import ProductDetailPage from './pages/ProductDetailPage';
import DeleteProduct from './pages/DeleteProduct';
import './App.css';
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(ProductList, {}) }), _jsx(Route, { path: "/product", element: _jsx(ProductList, {}) }), _jsx(Route, { path: "/add-product", element: _jsx(AddProduct, {}) }), _jsx(Route, { path: "/product/:id", element: _jsx(ProductDetailPage, {}) }), "  ", _jsx(Route, { path: "/edit-product/:id", element: _jsx(EditProduct, {}) }), "   ", _jsx(Route, { path: "/delete-product/:id", element: _jsx(DeleteProduct, {}) }), " "] }) }));
}
export default App;
