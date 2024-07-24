import React from "react";

import { Box, Typography } from "@mui/material";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Box className="container">
        <h1 class="wiggle" id="about-header">Did you know?</h1>
        <h5>
          Nearly <strong>60%</strong> of trans Americans have avoided using public bathrooms in
          the last year.
        </h5>

        <div id="need-to-pee">
          <img src="https://cdn4.iconfinder.com/data/icons/person-actions/227/person-action-006-512.png" />
        </div>
        <h5>
          tinkl is a bathroom-finder app that <strong>locates nearby gender-neutral and
          single-stall bathrooms</strong> so that trans, nonbinary and gender
          non-conforming people can <strong>pee in peace</strong>.
        </h5>
    </Box>
  );
}

export default AboutPage;
