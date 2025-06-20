import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';  // <-- импортируем EditProduct
import ProductDetailPage from './pages/ProductDetailPage';
import DeleteProduct from './pages/DeleteProduct';
import './App.css';

function App() {
  return <h1>App Loaded</h1>;
}


export default App;
