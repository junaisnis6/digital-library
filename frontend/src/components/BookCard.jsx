import api from "../services/api";

function BookCard({ book, onRefresh }) {
  const handleBorrow = async () => {
    try {
      await api.post("/requests", {
        bookId: book._id,
      });

      alert("Borrow request sent successfully!");

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send borrow request");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="book-card">
      <img
        src={
          book.image
            ? `http://localhost:5000${book.image}`
            : "https://via.placeholder.com/200x250?text=No+Image"
        }
        alt={book.title}
      />

      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong> {book.author}
      </p>

      <p>
        <strong>Genre:</strong> {book.genre}
      </p>

      <p>{book.description}</p>

      <p>
        <strong>Status:</strong> {book.status}
      </p>

      {token && book.status === "Available" && (
        <button onClick={handleBorrow}>Borrow Book</button>
      )}
    </div>
  );
}

export default BookCard;
