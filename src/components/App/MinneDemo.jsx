import React from "react";
import { PropTypes } from "prop-types";
import qr from '../App/qr-code.png'

function MinneDemo({embedId}) {
    return(
      <div className="qr-container">
      <img src={qr} maxWidth="100%" height="100%"></img></div>
      //   <div className="video-responsive">    <iframe
      //   width="853"
      //   height="480"
      //   src={`https://www.youtube.com/embed/${embedId}`}
      //   frameBorder="0"
      //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      //   allowFullScreen
      //   title="Embedded youtube"
      // /></div>
    )
}

MinneDemo.propTypes = {
    embedId: PropTypes.string.isRequired
  };

export default MinneDemo;