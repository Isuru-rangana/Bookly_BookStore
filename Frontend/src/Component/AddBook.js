import React, { useState } from "react";
import axios from "axios";

function AddBook() {
    const [bookname, setBookname] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [image, setImage] = useState("");


    const newBook = {
        bookname,
        title,
        author,
        price,
        description,
        category,
        subcategory,
        image
       
      };

      function convertToBase64(e) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          console.log(reader.result);
          setImage(reader.result);
        };
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
      }

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      alert("Success");
      await axios.post("http://localhost:9004/books", newBook);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="bookname" className="form-label">
            BookName
          </label>
          <input
            type="text"
            className="form-control"
            id="bookname"
            onChange={(e) => setBookname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="subcategory" className="form-label">
            Sub Category
          </label>
          <input
            type="text"
            className="form-control"
            id="subcategory"
            onChange={(e) => setSubcategory(e.target.value)}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file" className="form-control"id="image" onChange={convertToBase64}/>
        </div>

        

        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBook;
