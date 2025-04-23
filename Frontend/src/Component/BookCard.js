import React, { useEffect, useState } from "react";
import axios from "axios";
import Nave2 from "./Image/Nave2.jpg";
import "./BookCard.css";
import Popup from "./Popup"; // Import the Popup component

function BookCard({ handleAddToCart }) {
    const [books, setBooks] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const openPopup = (message) => {
        setPopupMessage(message);
        setPopupVisible(true);
    };

    const closePopup = () => {
        setPopupVisible(false);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:9004/books");
            setBooks(response.data);
        }

        fetchData();
    }, []);

    return (
        <div className="card-container">
            {books.map((book, index) => (
                <div className="card" key={index}>
                    <div onClick={() => openPopup(JSON.stringify(book))}>
                        <img className="cardimg" src={book.image} alt={book.title} />
                        <h1>{book.bookname}</h1>
                        <p className="price"> Rs.{book.price}</p>
                        <p>{book.title}</p>
                    </div>
                    <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
                </div>
            ))}

            {/* Conditionally render the pop-up */}
            {isPopupVisible && <Popup message={popupMessage} onClose={closePopup} />}
        </div>
    );
}

export default BookCard;
