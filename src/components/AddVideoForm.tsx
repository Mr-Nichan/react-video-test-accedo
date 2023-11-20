import React, { useState } from "react";

interface AddVideoFormProps {
  onSubmit: (url: string, title: string, subtitle: string) => void;
  onRequestClose: () => void;
}

const AddVideoForm: React.FC<AddVideoFormProps> = ({
  onSubmit,
  onRequestClose,
}) => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url || !title || !subtitle) {
      alert("Please fill all the fields");
      return;
    }
    onSubmit(url, title, subtitle);
    setUrl("");
    setTitle("");
    setSubtitle("");

    onRequestClose();
  };

  return (
    <div className="add-video-form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            required
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subtitle">Subtitle:</label>
          <input
            type="text"
            required
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="close-modal-button"
          onClick={onRequestClose}
        >
          Close
        </button>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};

export default AddVideoForm;
