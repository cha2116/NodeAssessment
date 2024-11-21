const Movie = require('./../Models/movieModel');

exports.getAllMovies = async (req, res) => {
	try {
		const movies = await Movie.find(req.query);

		res.status(200).json({
			status: 'Success',
			length: movies.length,
			data: {
				movies,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'Fail',
			message: err.message,
		});
	}
};

exports.getMovie = async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);

		res.status(200).json({
			status: 'Success',

			data: {
				movie,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'Fail',
			message: err.message,
		});
	}
};

exports.createMovie = async (req, res) => {
	try {
		const movie = await Movie.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				movie,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.message,
		});
	}
};

exports.updateMovie = async (req, res) => {
	try {
		const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

		res.status(200).json({
			status: 'Success',
			data: {
				movie: updatedMovie,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'Fail',
			message: err.message,
		});
	}
};

exports.deleteMovie = async (req, res) => {
	try {
		await Movie.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'Sucess',
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'Fail',
			message: err.message,
		});
	}
};
