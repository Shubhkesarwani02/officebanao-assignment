import React, { useState } from "react";
import { Drawer, Button } from "@mui/material";
import { rotateImage, flipImage } from "../utils/imageUtils";

const ImageEditor = ({ image, onSave, onClose }) => {
  const [editedImage, setEditedImage] = useState(image);

  const handleRotate = async () => {
    const newImage = await rotateImage(editedImage);
    setEditedImage(newImage);
  };

  const handleFlipHorizontal = async () => {
    const newImage = await flipImage(editedImage, "horizontal");
    setEditedImage(newImage);
  };

  const handleFlipVertical = async () => {
    const newImage = await flipImage(editedImage, "vertical");
    setEditedImage(newImage);
  };

  return (
    <Drawer anchor="right" open={!!image} onClose={onClose}>
      <div style={{ padding: 20, textAlign: "center" }}>
        <h3>Image Editor</h3>
        <img src={editedImage} alt="Edited" style={{ maxWidth: "100%", marginBottom: 10 }} />
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button variant="contained" onClick={handleRotate}>Rotate</Button>
          <Button variant="contained" onClick={handleFlipHorizontal}>Flip Horizontal</Button>
          <Button variant="contained" onClick={handleFlipVertical}>Flip Vertical</Button>
          <Button variant="contained" color="success" onClick={() => onSave(editedImage)}>Save</Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ImageEditor;
