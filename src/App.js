import Home from './pages/Home';
import {BrowserRouter , Outlet, Route ,Routes ,} from 'react-router-dom';
import Read from './pages/Read';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import ProductForm from './components/ProductForm';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Notfound from './pages/Notfound';

export default function App() {
  return (
    <>
  
      
        <Routes>
          <Route path="/" element={<MainLayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/read/:id" element={<Read />} />
            <Route path="/about" element={<About/>} />
            <Route path="/datatable" element={<Dashboard />} />
            <Route path="/create" element={<ProductForm edit={false}/>} />
            <Route path="/edit" element={<ProductForm edit={true} />} />
            <Route path="/*" element={<Notfound />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      
      </>
  )
}

function MainLayout(){
    return(
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    )
}