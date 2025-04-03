/* eslint-disable no-unused-vars */
export const getCroppedImg = async (
  imageSrc,
  pixelCrop,
  rotation = 0,
  flipHorizontal = false,
  flipVertical = false
) => {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Canvas 2D context not available");
      return null;
    }

    // Calculate dimensions for cropping
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // Set canvas size to safe area to handle rotations
    canvas.width = safeArea;
    canvas.height = safeArea;

    // Fill with transparent background
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Move to center of the canvas
    ctx.translate(safeArea / 2, safeArea / 2);
    
    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180);
    
    // Apply flipping - the key fix is here
    // For horizontal flip, we need to scale by -1 on X-axis
    // For vertical flip, we need to scale by -1 on Y-axis
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
    
    // Move back to properly position image
    ctx.translate(-image.width / 2, -image.height / 2);

    // Draw the original image
    ctx.drawImage(image, 0, 0);
    
    // Reset transformation for proper cropping coordinates
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Create a second canvas for actual cropping
    const cropCanvas = document.createElement("canvas");
    const cropCtx = cropCanvas.getContext("2d");

    if (!cropCtx) {
      console.error("Crop canvas 2D context not available");
      return null;
    }

    // Set exact crop size
    cropCanvas.width = pixelCrop.width;
    cropCanvas.height = pixelCrop.height;

    // Calculate crop position accounting for all transformations
    // This calculation needed adjustment to correctly handle flipping and rotation
    const cropX = safeArea / 2 - (image.width / 2) + pixelCrop.x;
    const cropY = safeArea / 2 - (image.height / 2) + pixelCrop.y;

    // Draw the cropped image
    cropCtx.drawImage(
      canvas,
      cropX,
      cropY,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // Create a blob from the cropped canvas
    return new Promise((resolve, reject) => {
      cropCanvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          
          // Create a URL for the blob
          try {
            const croppedImageUrl = URL.createObjectURL(blob);
            resolve(croppedImageUrl);
          } catch (e) {
            reject(new Error("Failed to create object URL"));
          }
        },
        "image/jpeg",
        0.95 // Quality
      );
    });
  } catch (e) {
    console.error("Error in image cropping:", e);
    return null;
  }
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("Image URL is empty"));
      return;
    }
    
    const image = new Image();
    
    // Handle successful load
    image.addEventListener("load", () => resolve(image));
    
    // Handle load errors
    image.addEventListener("error", (error) => {
      console.error("Error loading image:", error);
      reject(error);
    });
    
    // Set crossOrigin to handle potential CORS issues
    image.setAttribute("crossOrigin", "anonymous");
    
    // Set source after attaching event listeners
    image.src = url;
    
    // If the image is already loaded (e.g. from cache), the load event might not fire
    if (image.complete) {
      resolve(image);
    }
  });

// export const getCroppedImg = async (
//   imageSrc,
//   pixelCrop,
//   rotation = 0,
//   flipHorizontal = false,
//   flipVertical = false
// ) => {
//   try {
//     const image = await createImage(imageSrc);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");

//     if (!ctx) {
//       console.error("Canvas 2D context not available");
//       return null;
//     }

//     // Calculate dimensions for cropping
//     const maxSize = Math.max(image.width, image.height);
//     const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

//     // Set canvas size to safe area to handle rotations
//     canvas.width = safeArea;
//     canvas.height = safeArea;

//     // Fill with transparent background
//     ctx.fillStyle = "rgba(0, 0, 0, 0)";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Move to center, apply transformations correctly
//     ctx.translate(safeArea / 2, safeArea / 2);
//     ctx.rotate((rotation * Math.PI) / 180);
//     ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
//     ctx.translate(-image.width / 2, -image.height / 2);

//     // Draw the original image
//     ctx.drawImage(image, 0, 0);
    
//     // Reset transformation for proper cropping coordinates
//     ctx.setTransform(1, 0, 0, 1, 0, 0);

//     // Create a second canvas for actual cropping
//     const cropCanvas = document.createElement("canvas");
//     const cropCtx = cropCanvas.getContext("2d");

//     if (!cropCtx) {
//       console.error("Crop canvas 2D context not available");
//       return null;
//     }

//     // Set exact crop size
//     cropCanvas.width = pixelCrop.width;
//     cropCanvas.height = pixelCrop.height;

//     // Calculate correct crop position considering the transformations
//     const cropX = safeArea / 2 - image.width / 2 + pixelCrop.x;
//     const cropY = safeArea / 2 - image.height / 2 + pixelCrop.y;

//     // Draw the cropped image
//     cropCtx.drawImage(
//       canvas,
//       cropX,
//       cropY,
//       pixelCrop.width,
//       pixelCrop.height,
//       0,
//       0,
//       pixelCrop.width,
//       pixelCrop.height
//     );

//     // Create a blob from the cropped canvas
//     return new Promise((resolve, reject) => {
//       cropCanvas.toBlob(
//         (blob) => {
//           if (!blob) {
//             reject(new Error("Canvas is empty"));
//             return;
//           }
          
//           // Create a URL for the blob
//           try {
//             const croppedImageUrl = URL.createObjectURL(blob);
//             resolve(croppedImageUrl);
//           } catch (e) {
//             reject(new Error("Failed to create object URL"));
//           }
//         },
//         "image/jpeg",
//         0.95 // Quality
//       );
//     });
//   } catch (e) {
//     console.error("Error in image cropping:", e);
//     return null;
//   }
// };

// const createImage = (url) =>
//   new Promise((resolve, reject) => {
//     if (!url) {
//       reject(new Error("Image URL is empty"));
//       return;
//     }
    
//     const image = new Image();
    
//     // Handle successful load
//     image.addEventListener("load", () => resolve(image));
    
//     // Handle load errors
//     image.addEventListener("error", (error) => {
//       console.error("Error loading image:", error);
//       reject(error);
//     });
    
//     // Set crossOrigin to handle potential CORS issues
//     image.setAttribute("crossOrigin", "anonymous");
    
//     // Set source after attaching event listeners
//     image.src = url;
    
//     // If the image is already loaded (e.g. from cache), the load event might not fire
//     if (image.complete) {
//       resolve(image);
//     }
//   });