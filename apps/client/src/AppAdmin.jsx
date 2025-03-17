import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBarA from './components/navbarA';
import Footer from './components/footer';
import Dashboard from './views/dashBoard';
import Login from './components/login';

function AppAdmin() {
  return (
      <div>
        <NavBarA/>
          <div className="AppAdmin">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        <Footer />
      </div>
  )
}

export default AppAdmin