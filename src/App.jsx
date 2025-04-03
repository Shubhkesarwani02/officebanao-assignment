import React, { useState } from "react";
import ImageUploader from "./components/imageUploader";
import ImageEditor from "./components/imageEditor";
import MasonryGallery from "./components/MasonryGallery";
import "./styles/App.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  const handleImageUpload = (image) => {
    setCurrentImage(image);
  };

  const handleSaveImage = (editedImage) => {
    setImages([...images, editedImage]);
    setCurrentImage(null);
  };

  return (
    <div>
      <h1>Image Asset Manager</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      <ImageEditor image={currentImage} onSave={handleSaveImage} onClose={() => setCurrentImage(null)} />
      <MasonryGallery images={images} />
    </div>
  );
};

export default App;
