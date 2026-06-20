import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function MyBooks() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await api.get("/books/my-books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    const confirmed = window.confirm("Delete this book?");

    if (!confirmed) return;

    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };

  return (
    <div>
      <h2>My Books</h2>

      {books.length === 0 ? (
        <p>You haven't added any books yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.status}</td>
                <td>
                  <Link to={`/edit-book/${book._id}`}>
                    <button>Edit</button>
                  </Link>

                  <button
                    onClick={() => deleteBook(book._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBooks;
