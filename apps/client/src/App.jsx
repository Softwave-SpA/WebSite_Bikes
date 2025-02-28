import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home';
import Products from './views/products';
import ProductDetails from './views/product_details';
import Services from './views/services';
import Contact from './views/contact';
import NavBar from './components/navbar';
import Footer from './components/footer';
import CheckoutProduct from './views/checkoutProduct';
import CheckoutService from './views/checkoutService';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkoutProduct" element={<CheckoutProduct />} />
          <Route path="/checkoutService" element={<CheckoutService />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
