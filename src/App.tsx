import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PageNotFound from './components/PageNotFound';
import { Flowbite } from 'flowbite-react';
import About from './components/About';
import MyCards from './components/MyCards';
import FavoritesCards from './components/FavoritesCards';
import AuthProvider from './components/context/AuthProvider';
import Footer from './components/Footer';
import BusinessPage from './components/BusinessPage';

function App() {
  return (
    <AuthProvider>

    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/myfavorites' element={<FavoritesCards/>}/>
          <Route path='/mycards' element={<MyCards/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/card/:id' element={<BusinessPage/>}/>
          <Route path='*' element={<PageNotFound/>}/>
          
        </Routes>
        <Footer/>
      </Router>
      

    </div>
    
    </AuthProvider>
  );
}

export default App;
