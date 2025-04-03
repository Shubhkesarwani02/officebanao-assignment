# OfficeBanao Assignment - Image Management Application

A modern, responsive React application for uploading, editing, and managing image assets. This application allows users to upload images, perform basic image editing operations, and view their image collection in an attractive masonry-style layout.

## Table of Contents
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Deployment](#deployment)

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
# Clone the repository
git clone https://github.com/Shubhkesarwani02/officebanao-assignment.git
cd officebanao-assignment

# Install dependencies
npm install
```

## Getting Started

After installing the dependencies, you can start the development server:

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173/`. Open this URL in your browser to view the application.

## Features

- **Image Upload**: 
  - Drag-and-drop interface for easy image uploading
  - File type validation to ensure only images are uploaded

- **Image Editing**:
  - Crop images with an interactive cropping tool
  - Rotate images clockwise in 90-degree increments
  - Flip images horizontally or vertically
  - Replace images while maintaining the same item in your collection
  - Zoom control for precise cropping

- **Image Gallery**:
  - Responsive masonry layout that adapts to different screen sizes
  - Attractive hover effects to reveal editing options
  - Edit or delete images directly from the gallery view

- **User Interface**:
  - Clean, modern design using Material UI components
  - Responsive layout that works on desktop and mobile devices
  - Intuitive controls and workflow

## Technologies Used

- **React**: Frontend library for building the user interface
- **Vite**: Next-generation frontend tooling for faster development
- **Material UI**: Component library for consistent and attractive UI elements
- **react-dropzone**: For drag-and-drop file upload functionality
- **react-easy-crop**: Provides the image cropping functionality
- **react-masonry-css**: Creates the masonry layout for the image gallery
- **UUID**: Generates unique identifiers for images

## Project Structure

```
officebanao-assignment/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ImageUpload.jsx    # Handles image upload functionality
│   │   ├── ImageEditor.jsx    # Provides image editing capabilities
│   │   ├── ImageMasonry.jsx   # Displays images in a masonry layout
│   │   └── AppLayout.jsx      # Main layout component
│   ├── hooks/
│   │   └── useImageEditor.jsx # Custom hook for image editing logic
│   ├── utils/
│   │   └── imageUtils.js      # Utility functions for image manipulation
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── styles.css             # Global styles
└── README.md
```

## Usage

1. **Upload an Image**:
   - Click on the upload area or drag and drop an image into it.
   - The application will open the editor automatically.

2. **Edit the Image**:
   - Use the cropping tool to select the desired portion of the image.
   - Use the zoom slider to adjust the view.
   - Click the rotate button to rotate the image clockwise.
   - Use the flip buttons to mirror the image horizontally or vertically.
   - Click "Save" to confirm your edits or "Cancel" to discard them.

3. **Manage Your Image Gallery**:
   - Hover over an image to reveal the edit and delete options.
   - Click the edit icon to make further changes to an image.
   - Click the delete icon to remove an image from the gallery.

## Deployment

   - Live Deployment: Hosted on Vercel for fast and seamless performance.
   - Easy Setup: Just connect the repo, configure build settings, and deploy.
   - Accessible Anywhere: Get a shareable live link instantly after deployment.

