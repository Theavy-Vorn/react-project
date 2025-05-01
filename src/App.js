import Home from './pages/Home';
import {BrowserRouter , Route ,Routes ,} from 'react-router-dom';
import Read from './pages/Read';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import ProductForm from './components/ProductForm';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <>
  
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/about" element={<About/>} />
          <Route path="/create" element={<ProductForm/>} />
          <Route path="/datatable" element={<Dashboard />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
     
      </>
  )
}