import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';  // <-- импортируем EditProduct
import ProductDetailPage from './pages/ProductDetailPage';
import DeleteProduct from './pages/DeleteProduct';
import './App.css';

function App() {
  return (
    <Router>
 
<Routes>
  <Route path="/" element={<ProductList />} />
  <Route path="/product" element={<ProductList />} />
  <Route path="/add-product" element={<AddProduct />} />
  <Route path="/product/:id" element={<ProductDetailPage />} />  {/* детали */}
  <Route path="/edit-product/:id" element={<EditProduct />} />   {/* редактирование */}
  <Route path="/delete-product/:id" element={<DeleteProduct />} /> {/* удаление */}
</Routes>


 
    </Router>
  );
}

export default App;
