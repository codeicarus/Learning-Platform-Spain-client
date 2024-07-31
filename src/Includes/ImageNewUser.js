import React from "react";

const imageSources = [
  "/assets/images/questionImage/1.jpg",
  "/assets/images/questionImage/2.jpg",
  "/assets/images/questionImage/3.png",
  "/assets/images/questionImage/4.png",
  "/assets/images/questionImage/5.jpg",
  "/assets/images/questionImage/6.jpg",
];

const ImageComponent = (props) => {
  return (
    <img
      className={props.className}
      src={imageSources[props.image]}
      alt="Image question"
    />
  );
};

export default ImageComponent;
