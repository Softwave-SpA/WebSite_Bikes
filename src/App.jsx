import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroTemplates from './views/hero_templates';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Products from './views/products';


function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <div className="App">
          <Routes>
            <Route path="/" element={< HeroTemplates />} />
            <Route path="/products" element={< Products /> } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App