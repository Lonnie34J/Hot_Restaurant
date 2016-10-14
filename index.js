// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var reservation = [{
	customerName: 'Mary Miller',
	phoneNumber: '9194510966',
	customerEmail: 'marymiller1954@gmail.com',
	customerID: '13131313'
}, {
	customerName: 'John Doe',
	phoneNumber: '9194567891',
	customerEmail: 'johndoe@gmail.com',
	customerID: '8983'
}, {
	customerName: 'Charlie Brown',
	phoneNumber: '9195301112',
	customerEmail: 'charliebrown@yahoo.com',
	customerID: '1350'
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/tables', function (req, res) {
	res.sendFile(path.join(__dirname, 'tables.html'));
});

app.get('/reserve', function (req, res) {
	res.sendFile(path.join(__dirname, 'reserve.html'));
});

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:reservation?', function (req, res) {
	var chosen = req.params.reservation;

	if (chosen) {
		console.log(chosen);

		for (var i = 0; i < reservation.length; i++) {
			if (chosen === reservation[i].routeName) {
				res.json(reservation[i]);
				return;
			}
		}

		res.json(false);
	} else {
		res.json(reservation);
	}
});

// Create New Characters - takes in JSON input
app.post('/api/tables', function (req, res) {
	var newReservation = req.body;
	newReservation.routeName = newReservation.customerName.replace(/\s+/g, '').toLowerCase();

	console.log(newReservation);

	reservation.push(newReservation);

	res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});

