// EditModal.js
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const EditModal = ({ show, onHide, rowData, onUpdate }) => {
  const [updatedData, setUpdatedData] = useState({ ...rowData });

  const handleFieldChange = (field, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(
        `https://64c778b10a25021fde928997.mockapi.io/apt/s1/students/${rowData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        const updatedRowData = { ...rowData, ...updatedData };
        console.log("updatedData", updatedRowData);
        onUpdate(updatedRowData);
        // Data updated successfully
        onHide(); // Close the modal
        setUpdatedData("");
      } else {
        console.error("Error updating data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  if (!rowData) {
    return null; // Return null if rowData is not available
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Place your form or content for editing here */}
        <form>
          {Object.keys(rowData).map((key) => (
            <div className="form-group" key={key}>
              <label>{key}</label>
              <input
                type="text"
                className="form-control"
                value={updatedData[key] || rowData[key]}
                onChange={(e) => handleFieldChange(key, e.target.value)}
              />
            </div>
          ))}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onHide}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
