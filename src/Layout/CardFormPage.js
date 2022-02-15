import React from 'react'

export default function CardFormPage({
  onSubmit,
  onCancel,
  formData,
  setFormData,
  cancelLabel,
  submitLabel
}) {

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    return (
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="card-front">Front:</label>
            <textarea value={formData.front} onChange={handleChange} name="front" id="card-front" />
          </div>
          <div>
            <label htmlFor="card-back">Back:</label>
            <textarea value={formData.back} onChange={handleChange} name="back" id="card-back" />
          </div>
          <div>
            <button onClick={onCancel} type="button" className="btn btn-secondary">{cancelLabel}</button>
            <button type="submit" className="btn btn-primary">{submitLabel}</button>
          </div>
        </form>
      );
}  