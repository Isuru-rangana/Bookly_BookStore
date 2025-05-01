import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BookMore.css";

import { useParams } from "react-router-dom";

function BookMore() {
  const { id } = useParams();
  const [book, setBookdetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:9004/books/${id}`)
      .then((res) => setBookdetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="card-body">
        <h3 className="card-title">Book details</h3>
        <div className="card-text">
          <img className="bookimg" src={book.image} />
          <p>
            <strong>Book Name:</strong> {book.bookName || ""}
          </p>
          <p>
            <strong>Title:</strong> {book.title || ""}
          </p>
          <p>
            <strong>Author:</strong>
            {book.author || ""}
          </p>
          <p>
            <strong>Description:</strong> {book.description || ""}
          </p>

          <p>
            <strong>price:</strong> {book.price || ""}
          </p>
          <booten>Add to card</booten>
        </div>
      </div>
    </div>
  );
}
export default BookMore;
