import React, { useState } from 'react';
import "./Dummy.css";
import { FiEdit } from "react-icons/fi"; 



function Dummy() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // ✅ Fix: Added missing state
  const [finalButton, setFinalButton] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    borderColor: "#000000",
    borderWidth: 1,
  });

  const handleFormChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFormSubmit = async () => {
    setFinalButton({ ...formData });
    setIsAdding(false);
    setIsEditing(false); 

    await fetch("/update-section", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        component: "Hotel",
        field: "cta_button",
        value: formData.label,
      }),
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    if (finalButton) {
      setFormData({ ...finalButton });
    }
  };

  return (
    <div className="dummy-container">
          <div className="button-editor-wrapper">
            {!finalButton && !isAdding && (
              <button className="add-btn" onClick={() => setIsAdding(true)}>
                + Add Button
              </button>
            )}

            {(isAdding || isEditing) && (
              <div className="custom-form-box">
                <h4>{isEditing ? "Edit Your Button" : "Create Your Button"}</h4>

                <div className="form-group">
                  <label>Text</label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => handleFormChange("label", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Border Color</label>
                  <input
                    type="color"
                    value={formData.borderColor}
                    onChange={(e) => handleFormChange("borderColor", e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Border Width</label>
                  <input
                    type="number"
                    value={formData.borderWidth}
                    min="1"
                    max="10"
                    onChange={(e) => handleFormChange("borderWidth", e.target.value)}
                  />
                </div>

                <button className="submit-btn" onClick={handleFormSubmit}>
                  Submit
                </button>
              </div>
            )}

            {finalButton && !isEditing && !isAdding && (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "20px" }}>
                <button
                  style={{
                    border: `${finalButton.borderWidth}px solid ${finalButton.borderColor}`,
                    padding: "10px 16px",
                    background: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {finalButton.label}
                </button>

                <FiEdit
                  onClick={handleEditClick}
                  style={{ cursor: "pointer", fontSize: "20px", color: "#444" }}
                  title="Edit Button"
                />
              </div>
            )}
          </div>
       
    </div>
  );
}

export default Dummy;
