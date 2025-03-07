import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarA from './components/navbarA';
import Footer from './components/footer';
import Dashboard from './views/dashBoard';

function AppAdmin() {
  return (
      <div>
        <NavBarA/>
          <div className="AppAdmin">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        <Footer />
      </div>
  )
}

export default AppAdmin