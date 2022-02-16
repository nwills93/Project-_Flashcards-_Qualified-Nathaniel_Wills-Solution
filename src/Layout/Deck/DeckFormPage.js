import React from "react";

//Generic form page which is utilized by the Create Deck and Edit Deck components.

export default function DeckFormPage({
  onSubmit,
  onCancel,
  formData,
  setFormData,
}) {
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          value={formData.name}
          onChange={handleChange}
          name="name"
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={handleChange}
          name="description"
          id="description"
          className="form-control"
        />
      </div>
      <div>
        <button onClick={onCancel} type="button" className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary ml-3">
          Submit
        </button>
      </div>
    </form>
  );
}
