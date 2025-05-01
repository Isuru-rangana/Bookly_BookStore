import React, { useEffect, useState } from "react";
import axios from "axios";

function BookAdd() {
  const [bookName, setBookname] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:9004/categores");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:9004/subcategores");
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
  }, []);

  const newBook = {
    bookName,
    title,
    author,
    price,
    description,
    categoryId: selectedCategoryId,
    subcategoryId: selectedSubcategoryId,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Alert for testing
      alert("Success");
      // Include the category ID in the request data
      await axios.post("http://localhost:9004/books", newBook);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form>
        <h1>Add book</h1>
        <label>Book name:</label>
        <br />
        <input
          type="text"
          id="bookName"
          name="bookName"
          onChange={(e) => setBookname(e.target.value)}
        />
        <br />
        <label>Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <br />
        <label>Author:</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <label>Price:</label>
        <br />
        <input
          type="text"
          id="price"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label>Description:</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <label>Category:</label>
        <br />
        {/* <select
          name="category"
          id="category"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value={null}>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} >
              {category.cname}
            </option>
          ))}
        </select> */}

        <input
          type="text"
          id="category"
          name="Category"
          onChange={(e) => setCategories(e.target.value)}
        />
        <br />
        <br />
        <label>SubCategory:</label>
        <br />
        <br />
        <br />
        {/* 
        <select
          name="subcategory"
          id="subcategory"
          value={selectedSubcategoryId}
          onChange={(e) => setSelectedSubcategoryId(e.target.value)}
        >
          <option value={null}>Select a  subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategories.id} >
              {subcategory.cname}
            </option>
          ))}
        </select> */}

        <input
          type="text"
          id="subcategory"
          name="Subcategory"
          onChange={(e) => setSubcategories(e.target.value)}
        />
        <br />
        <br />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default BookAdd;
