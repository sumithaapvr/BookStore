import React, { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import "./App.css";
//demo

const App = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <h1>📚 Book Recommendation System</h1>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="grid">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default App;
