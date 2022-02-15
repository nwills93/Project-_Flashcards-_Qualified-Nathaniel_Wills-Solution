import React from "react"

export default function DeckFormPage({
    onSubmit,
    onCancel,
    formData,
    setFormData
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
            <label htmlFor="name">Name</label>
            <input value={formData.name} onChange={handleChange} name="name" id="name" type="text"/>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea value={formData.description} onChange={handleChange} name="description" id="description" />
          </div>
          <div>
            <button onClick={onCancel} type="button" className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      );
}