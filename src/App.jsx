import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroTemplates from './views/hero_templates';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Products from './views/products';
import ProductDetails from './views/product_details'

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <div className="App">
          <Routes>
            <Route path="/" element={< HeroTemplates />} />
            <Route path="/products" element={< Products /> } />
            <Route path="/products/:id" element={< ProductDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App