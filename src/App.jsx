import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroTemplates from './views/hero_templates';
import NavBar from './components/navbar';
import Carrusel from './components/carrusel';

function App() {
  return (
    <Router>
      <div>
        <NavBar/>
        <div className="App">
          <Routes>
            <Route path="/" element={< HeroTemplates />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App