import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const MainLayout = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isBackoffice = path.startsWith('/admin') || path === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] overflow-x-hidden">
      {!isBackoffice && <Navbar />}
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
      {!isBackoffice && <Footer />}
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <MainLayout />
      </Router>
    </CartProvider>
  );
}

export default App;
