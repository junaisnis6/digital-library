import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const res = await api.get(`/books/${id}`);

      setBook({
        title: res.data.title,
        author: res.data.author,
        genre: res.data.genre,
        description: res.data.description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("genre", book.genre);
      formData.append("description", book.description);

      if (image) {
        formData.append("image", image);
      }

      await api.put(`/books/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book updated successfully");
      navigate("/my-books");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update book");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Edit Book</h2>

        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />

        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />

        <textarea
          name="description"
          value={book.description}
          onChange={handleChange}
          rows={4}
          placeholder="Description"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
