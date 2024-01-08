const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const allBathroomsRouter = require('./routes/allBathrooms.router')
const locationRouter = require('./routes/location.router')
const searchRouter = require('./routes/search.router')
const detailsRouter = require('./routes/details.router')
const feedbackRouter = require('./routes/feedback.router')
const apiRouter = require('./routes/api.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
// get route for clicked bathroom's details
app.use('/details', detailsRouter);
// get route for bathrooms by distance
app.use('/distance', locationRouter);
// get route to geocode address into lat and lng coordinates
app.use('/search', searchRouter)
// get all bathrooms router
app.use('/bathrooms', allBathroomsRouter);
// send feedback comments and upvotes/downvotes to database
app.use('/feedback', feedbackRouter);
// send get request to Refuge Restrooms API
app.use('/api', apiRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
