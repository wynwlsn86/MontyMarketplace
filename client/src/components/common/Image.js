import React from "react";



export const Image = ({ source, alt, classname }) => {
  return (
 
      <img src={source} alt={alt} className={classname} />

  );
};
