import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Inventory from './pages/Admin/Inventory';
import Products from './pages/Products/Products';

import ProductDetail from './pages/ProductDetail/ProductDetail';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import AdminGuard from './components/AdminGuard';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#060913] overflow-x-hidden text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Admin_panel" element={
                <AdminGuard>
                  <Admin />
                </AdminGuard>
              } />
              <Route path="/Admin_panel/inventario" element={
                <AdminGuard>
                  <Inventory />
                </AdminGuard>
              } />
              <Route path="/admin_panel" element={
                <AdminGuard>
                  <Admin />
                </AdminGuard>
              } />
              <Route path="/admin" element={
                <AdminGuard>
                  <Admin />
                </AdminGuard>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}




export default App;
