import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("genre", formData.genre);
      data.append("description", formData.description);

      if (image) {
        data.append("image", image);
      }

      await api.post("/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book added successfully!");
      navigate("/my-books");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Add Book</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="4"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
