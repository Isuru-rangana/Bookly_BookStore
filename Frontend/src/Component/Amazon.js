import React from "react";
import BookCard from "./BookCard";

const Amazon = ({ books, handleClick }) => {
  return (
    <section>
      {Array.isArray(books) &&
        books.map((book) => (
          <BookCard book={book} key={book.id} handleClick={handleClick} />
        ))}
    </section>
  );
};

export default Amazon;
