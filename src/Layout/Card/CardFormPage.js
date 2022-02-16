import React from "react";

//Generic form page which is utilized by the AddCard and EditCard Components.

export default function CardFormPage({
  onSubmit,
  onCancel,
  formData,
  setFormData,
  cancelLabel,
  submitLabel,
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
        <label htmlFor="card-front" className="form-label">
          Front:
        </label>
        <textarea
          value={formData.front}
          onChange={handleChange}
          name="front"
          id="card-front"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="card-back" className="form-label">
          Back:
        </label>
        <textarea
          value={formData.back}
          onChange={handleChange}
          name="back"
          id="card-back"
          className="form-control"
        />
      </div>
      <div>
        <button onClick={onCancel} type="button" className="btn btn-secondary">
          {cancelLabel}
        </button>
        <button type="submit" className="btn btn-primary ml-3">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
