import React from 'react';
import axios from "axios";
import {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Allbooks.css'; 






function Allbook(){
    const [book, setBook] = useState([]); 
    const [selectedbook, setSelectedbook] = useState(null);
    const [showForm, setShowForm] = useState(false); 

    useEffect(() => {
      async function fetchData() {
        const response = await axios.get("http://localhost:9004/books"); 
        setBook(response.data);
      }
      console.log()
      fetchData();
    }, []);



    function handleDelete(id) {
      
      axios.delete(`http://localhost:9004/books/${id}`)
        .then(() => {
          
          setBook(book.filter(book => book._id !== id));
        })
        .catch(err => console.error(err));
    }



    

      
      function handleCloseForm() {
        setSelectedbook(null);
        setShowForm(false);
      }



    return(
        <div className="container">

          <div >
            <h1>All Book</h1>

            

            <table >
  <thead class="tab" style={{backgroundColor:'#5091ca'}}>
        <tr>
          <th>Book Name</th>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Image</th>
          <th>Update</th>
          <th>Delete</th>
          
        </tr>
      </thead>
      <tbody>
        {book.map((book, index) => (
          <tr key={index}>
            <td>{book.bookname}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.price}</td>
            <td>{book.description}</td>
            <td>{book.category}</td>
            <td>{book.subcategory}</td>
            <td><img src={book.image} className='books'/></td>
            <button onClick={() => handleDelete(book._id)}class="btn btn-success" >Delete</button>

           
           
            
          </tr>
        ))}
      </tbody>
    </table>

    </div>
    

        </div>
    )

}
export default Allbook;