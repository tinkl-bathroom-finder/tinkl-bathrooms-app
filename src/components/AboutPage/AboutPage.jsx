import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
      <p>tinkl is a bathroom-finder app that locates nearby gender-neutral and single-stall bathrooms.</p>
      </div>
    </div>
  );
}

export default AboutPage;
