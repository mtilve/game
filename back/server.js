// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// allow CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	next();
  });

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set the port

// DATABASE SETUP
var mongoose   = require('mongoose');
// connect to database
mongoose.connect('mongodb://admin:abc1234@ds121321.mlab.com:21321/gamedrones');


// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB connection alive");
});

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// Moves
var Move = require('./app/models/move');

router.route('/moves')

	// create a move (accessed at POST http://localhost:8080/api/moves)
	.post(function(req, res) {
		
		var move = new Move();
		move.move = req.body.move;
		move.kills = req.body.kills;

		move.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Move created!' });
		});	
	})

	// get all the moves (accessed at GET http://localhost:8080/api/moves)
	.get(function(req, res) {
		Move.find(function(err, moves) {
			if (err)
				res.send(err);

			res.json(moves);
		});
	})
	// update the move with this id
	.put(function(req, res) {
		Move.findById(req.body._id, function(err, move) {

			if (err)
				res.send(err);

			move.move = req.body.move;
			move.kills = req.body.kills;
			move.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Move updated!' });
			});

		});
	});

	router.route('/moves/:_id')
	// delete the move with this id
	.delete(function(req, res) {
		Move.remove({
			_id: req.params._id
		}, function(err, move) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// Rounds
var Round = require('./app/models/round');

router.route('/rounds')

	// create a round (accessed at POST http://localhost:8080/api/rounds)
	.post(function(req, res) {
		
		var round = new Round();
		round.Id = req.body.Id;
		round.Winner = req.body.Winner;
		round.Round = req.body.Round;
		round.Date = req.body.Date;

		round.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Round created!' });
		});	
	})

	// get all the rounds (accessed at GET http://localhost:8080/api/rounds)
	.get(function(req, res) {
		Round.find(function(err, rounds) {
			if (err)
				res.send(err);

			res.json(rounds);
		});
	});

	// get the round with that id
	router.route('/rounds/:round_id')
	.get(function(req, res) {

		Round.find({ Id: req.params.round_id }, function(err, round) {
			if (err)
				res.send(err);
			res.json(round);
		});
	});

// Games
var Game = require('./app/models/game');

router.route('/games')

	// create a game (accessed at POST http://localhost:8080/api/games)
	.post(function(req, res) {	
		var game = new Game();
		game.nameWin = req.body.nameWin;
		game.nameLose = req.body.nameLose;
		game.round = req.body.round;
		game.date = req.body.date;

		game.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Game created!' });
		});	
	})

	// get all the games (accessed at GET http://localhost:8080/api/games)
	.get(function(req, res) {
		Game.find(function(err, result) {
			if (err)
				res.send(err);

			res.json(result);
		});
	});

	// get top 5 winners or losers (accessed at GET http://localhost:8080/api/stats)
	router.route('/stats/:type_id')
	.get(function(req, res) {
		if (req.params.type_id == "1"){
			Game.aggregate([
				[
					{$group: {
						_id: '$nameWin',
						count: {$sum: 1}
					}},
					{ "$sort": { "count": -1 } },
					{ "$limit": 5 }
				]
			], function (err, result) {
					if (err)
						res.send(err);
		
					res.json(result);
			});
		}else
		{
			Game.aggregate([
				[
					{$group: {
						_id: '$nameLose',
						count: {$sum: 1}
					}},
					{ "$sort": { "count": -1 } },
					{ "$limit": 5 }
				]
			], function (err, result) {
					if (err)
						res.send(err);
		
					res.json(result);
			});
		}
	});

	// get winners and then cant of victories (accessed at GET http://localhost:8080/api/statswincant)
	router.route('/statswincant')
	.get(function(req, res) {
		Game.aggregate([
			[
				{$group: {
					_id: '$nameWin',
					count: {$sum: 1}
				}},
				{ "$sort": { "count": -1 } }
			]
		], function (err, result) {
				if (err)
					res.send(err);
	
				res.json(result);
		});
	});

	// get winners and then cant of victories (accessed at GET http://localhost:8080/api/statswinday)
	router.route('/statswinday')
	.get(function(req, res) {
		Game.aggregate([
			[
				{$project : {
					new_time_stamp : {
						$substr : ["$date",0, 10]
					}
				}},
				{$group: {
					_id: "$new_time_stamp",
					count: {$sum: 1}
				}},
				{ "$sort": { "_id": -1 } },
				{ "$limit": 7 }
			]
		], function (err, result) {
				if (err)
					res.send(err);
	
				res.json(result);
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
