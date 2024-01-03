const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const templateRouter = require('./routes/template.router')
const locationRouter = require('./routes/location.router')
const searchRouter = require('./routes/address.router')

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
// get route is on templateRouter for now => make a separate route at some point
app.use('/bathrooms', templateRouter);
// get route for bathrooms by distance
app.use('/distance', locationRouter);
// get route to geocode address into lat and lng coordinates
app.use('/search', searchRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
