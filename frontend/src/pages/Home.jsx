import { useEffect, useState } from "react";
import api from "../services/api";
import BookCard from "../components/BookCard";
import "../styles/Home.css";

function Home() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#2563eb,#3b82f6)",
        color: "white",
        padding: "50px",
        borderRadius: "16px",
        marginBottom: "30px",
        textAlign: "center",
      }}
    >
      <h2>Digital Library</h2>
      <p>Discover, share, and borrow books with ease.</p>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book._id} book={book} onRefresh={fetchBooks} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
