import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import ImageEditor from './ImageEditor.jsx';
import { Drawer } from '@mui/material';

function ImageMasonry({ images, onUpdateImage, onDeleteImage }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleEditClick = (image) => {
    setSelectedImage(image);
    setIsEditorOpen(true);
  };

  const handleSaveEdit = (editedImage) => {
    onUpdateImage(editedImage.id, editedImage);
    setIsEditorOpen(false);
    setSelectedImage(null);
  };

  const handleCancelEdit = () => {
    setIsEditorOpen(false);
    setSelectedImage(null);
  };

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (images.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="textSecondary">
          No images uploaded yet, Upload an image to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {images.map((image) => (
          <Box key={image.id} className="image-item">
            <img src={image.src} alt={image.name || 'Uploaded image'} />
            <Box className="image-overlay">
              <IconButton
                color="primary"
                onClick={() => handleEditClick(image)}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)', mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => onDeleteImage(image.id)}
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)' }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Masonry>

      <Drawer
        anchor="right"
        open={isEditorOpen}
        onClose={handleCancelEdit}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: '70%', md: '50%' },
            maxWidth: '600px',
            p: 2
          }
        }}
      >
        {selectedImage && (
          <ImageEditor
            image={selectedImage}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </Drawer>
    </>
  );
}

export default ImageMasonry;