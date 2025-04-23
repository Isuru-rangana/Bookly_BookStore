import React, { useState } from 'react';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import './App.css';
import Header from './Component/Header';
import Home from './Component/Home';
import Slideshow from './Component/Slideshow';
import BookAdd from './Component/BookAdd';
import AddCategory from './Component/AddCategory';
import Allbook from './Component/Allbooks';
import BookCard from './Component/BookCard'; 
import BookMore from './Component/BookMore';
import ShoppingCart from './Component/ShopinCart';
import Front from './Component/Front';
import AddBook from './Component/AddBook';
import Contactus from './Component/Contactus';
import AboutUs from './Component/About Us';
import Footer from './Component/Footer';





function App() {

  const [cart, setCart] = useState([]);


  function addToCart(book) {
    setCart([...cart, book]);
  }
  
  


  return (
    <div className="App">

<BrowserRouter> 

<Routes>
<Route path='/Header'exact Component={Header}/>
      
      <Route path='/Home'exact Component={Home}/>

      <Route path='/Footer'exact Component={Footer}/>
      <Route path='/contact'exact Component={Contactus}/>
      <Route path='/About'exact Component={AboutUs}/>


      <Route path='/Slider'exact Component={Slideshow}/>
      <Route path='/Bookadd'exact Component={BookAdd}/>
      <Route path='/AddCategory'exact Component={AddCategory}/>
      <Route path='/Books'exact Component={Allbook}/>
     

      <Route path='/Book details/:id'element={<BookMore/>}/>
      <Route path="/ShoppingCart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
      <Route path='/Front'exact Component={Front}/>
      <Route path='/Addbook'exact Component={AddBook}/>

</Routes>




</BrowserRouter>
    



     
    </div>
  );
}

export default App;
