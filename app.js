//IMPORT PACKAGE
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 7000;
const moviesRouter = require('./Routes/movieRoutes');

let app = express();

const logger = function (req, res, next) {
	// console.log('Custom middleware called.');
	next();
};

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.static('./public/'));
app.use(logger);
app.use((req, res, next) => {
	req.requestedAt = new Date().toISOString();
	next();
});

app.use('/api/v1/movies', moviesRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
