import React from "react";



export const Image = ({ source, alt }) => {
  return (
    <div className="products-container">
      <img src={source} alt={alt} className="product-images" />
    </div>
  );
};
