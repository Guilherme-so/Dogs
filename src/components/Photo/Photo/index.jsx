import React from "react";
import PhotoContent from "../PhotoContent";

function Photo() {
  return (
    <section className="container mainContainer">
      <PhotoContent single={true} />
    </section>
  );
}

export default Photo;
