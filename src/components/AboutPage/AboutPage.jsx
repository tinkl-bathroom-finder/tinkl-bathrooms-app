import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>
          Nearly 60% of trans Americans have avoided using public bathrooms in
          the last year.
        </p>

        <div id="need-to-pee">
          <img src="https://cdn4.iconfinder.com/data/icons/person-actions/227/person-action-006-512.png" />
        </div>
        <h5>
          tinkl is a bathroom-finder app that locates nearby gender-neutral and
          single-stall bathrooms so that trans, nonbinary and gender
          non-conforming people can pee in peace.
        </h5>
      </div>
    </div>
  );
}

export default AboutPage;
