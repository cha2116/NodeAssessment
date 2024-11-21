const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Movie = require('./../Models/movieModel');

dotenv.config({ path: './config.env' });

//CONNECT TO MONGOOSE
mongoose
	.connect(process.env.CONN_STR, {
		useNewUrlParser: true,
	})
	.then((conn) => {
		console.log('DB Connection successfull');
	})
	.catch((error) => {
		console.log('Some error has occured');
	});

//READ MOVIES.JSON FILE
const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

//DELETE EXISTING MOVIE DOCUMENTS FROM  COLLECTION
const deleteMovies = async () => {
	try {
		await Movie.deleteMany();
		console.log('Data successfully deleted!');
	} catch (error) {
		console.log(error.message);
	}
	process.exit();
};

//IMPORT MOVIES DATA TO MONGODB COLLECTION
const importMovies = async () => {
	try {
		await Movie.create(movies);
		console.log('Data successfully imported!');
	} catch (error) {
		console.log(error.message);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	importMovies();
}
if (process.argv[2] === '--delete') {
	deleteMovies();
}

/*

console.log(process.argv) --> to get the indexes
RUN IN TERMINAL
node data/import-dev-data.js --import --> to import data
node data/import-dev-data.js --delete --> to delete data
*/
