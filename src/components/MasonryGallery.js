import React from "react";
import Masonry from "react-masonry-css";

const MasonryGallery = ({ images }) => {
  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {images.map((img, index) => (
        <img key={index} src={img} alt={`Uploaded ${index}`} />
      ))}
    </Masonry>
  );
};

export default MasonryGallery;
