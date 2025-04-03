// imageUtils.js - Utility functions for image transformations

export const rotateImage = (imageSrc, angle = 90) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous"; // Fixes potential CORS issues
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        if (angle === 90 || angle === 270) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
  
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
  
        resolve(canvas.toDataURL());
      };
    });
  };
  
  export const flipImage = (imageSrc, direction = "horizontal") => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
  
        ctx.translate(
          direction === "horizontal" ? canvas.width : 0,
          direction === "vertical" ? canvas.height : 0
        );
  
        ctx.scale(
          direction === "horizontal" ? -1 : 1,
          direction === "vertical" ? -1 : 1
        );
  
        ctx.drawImage(img, 0, 0);
  
        resolve(canvas.toDataURL()); // Return new image as Base64 URL
      };
    });
  };
  
  export const cropImage = (imageSrc, x, y, width, height) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Set canvas size to the crop dimensions
        canvas.width = width;
        canvas.height = height;
  
        // Draw the cropped image onto the canvas
        ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  
        resolve(canvas.toDataURL()); // Return cropped image as Base64 URL
      };
    });
  };
  