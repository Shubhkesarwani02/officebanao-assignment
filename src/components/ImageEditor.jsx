import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Slider,
  IconButton,
} from "@mui/material";
import {
  Crop as CropIcon,
  RotateRight as RotateRightIcon,
  FlipOutlined,
  Flip, 
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/imageUtils";
import { useDropzone } from "react-dropzone";

function ImageEditor({ image, onSave, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isFlippedHorizontally, setIsFlippedHorizontally] = useState(false);
  const [isFlippedVertically, setIsFlippedVertically] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(image.src);
  const [isReplacing, setIsReplacing] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      let resultSrc = currentSrc;

      if (croppedAreaPixels) {
        resultSrc = await getCroppedImg(
          currentSrc,
          croppedAreaPixels,
          rotation,
          isFlippedHorizontally,
          isFlippedVertically
        );
      }

      onSave({
        ...image,
        src: resultSrc,
        edited: true,
      });
    } catch (e) {
      console.error("Error saving image:", e);
    }
  };

  const handleRotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const handleFlipHorizontal = () => {
    setIsFlippedHorizontally((prev) => !prev);
  };

  const handleFlipVertical = () => {
    setIsFlippedVertically((prev) => !prev);
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setCurrentSrc(reader.result);
        setIsReplacing(false);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setIsFlippedHorizontally(false);
        setIsFlippedVertically(false);
        setCroppedAreaPixels(null);
      };

      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" gutterBottom>
        Edit Image
      </Typography>

      {isReplacing ? (
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #cccccc",
            borderRadius: 2,
            p: 3,
            mb: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input {...getInputProps()} />
          <UploadIcon sx={{ fontSize: 48, mb: 2 }} />
          <Typography>
            Drag & drop a new image here, or click to select
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => setIsReplacing(false)}
            sx={{ mt: 2 }}
          >
            Cancel Replace
          </Button>
        </Box>
      ) : (
        <Box sx={{ position: "relative", height: 400, mb: 2 }}>
          <Cropper
            image={currentSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            objectFit="contain"
            transform={`scale(${isFlippedHorizontally ? -1 : 1}, ${
              isFlippedVertically ? -1 : 1
            })`}
          />
        </Box>
      )}

      {!isReplacing && (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Zoom</Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e, newZoom) => setZoom(newZoom)}
            />
          </Box>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <IconButton
              onClick={handleRotate}
              color="primary"
              title="Rotate 90° clockwise"
            >
              <RotateRightIcon />
            </IconButton>
            <IconButton
              onClick={handleFlipHorizontal}
              color={isFlippedHorizontally ? "secondary" : "primary"}
              title="Flip horizontally"
            >
              <FlipOutlined style={{ transform: "rotate(90deg)" }} />
            </IconButton>
            <IconButton
              onClick={handleFlipVertical}
              color={isFlippedVertically ? "secondary" : "primary"}
              title="Flip vertically"
            >
              <Flip />
            </IconButton>
            <IconButton
              onClick={() => setIsReplacing(true)}
              color="primary"
              title="Replace image"
            >
              <UploadIcon />
            </IconButton>
          </Stack>
        </>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: "auto" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={isReplacing}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}

export default ImageEditor;
