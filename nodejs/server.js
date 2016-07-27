/// <reference path="JavaScript.js" />

var mongodb = require('mongodb');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/mydb';
var app = express();
var path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(8080, function () {
	console.log('Server running at http://127.0.0.1:8080/');

});
app.get('/', function (req, res) {
	res.sendFile('/DXBall/DXBall.html' ,{ root: __dirname });
        
            
});
MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		//HURRAY!! We are connected. :)
		console.log('Connection established to', url);
		var scoresCol = db.collection('scores');
		var mapsCol = db.collection('mapPos');
		app.post('/myaction', function (req, res) {
			// res.send('You sent the name "' + req.body.name + '".');
			var user = { name: req.body.name, score: req.body.score , Map: req.body.mapName };
			scoresCol.insert(user);
			var result = scoresCol.find();
			result.toArray(function (err, documents) {
				res.send(documents);
			});
		});
		app.post('/postmap', function (req, res) {
			// res.send('You sent the name "' + req.body.name + '".');
			var map = { name: req.body.mapName, brickPositions: req.body.brickPositions };
			mapsCol.insert(map);
			var result = mapsCol.find();
			result.toArray(function (err, documents) {
				res.send(documents);
			});
		});
		app.post('/postdeletemap', function (req, res) {
			var deleteMap = { idofmap : req.body.idofmap };
			var result = mapsCol.find();
			var willremove;
			result.toArray(function (err, documents) {
				willremove = documents[deleteMap.idofmap].name;
				mapsCol.remove({ "name": willremove });
			});
			result.toArray(function (err, documents) {

			    res.send(documents);
			});


			
			
		});
		
		/*  app.get('/myget', function (req, res) {
            req.query['scorelist'] =  
        });*/
       
        app.get('/get', function (req, res) {
			var result = scoresCol.find();
			result.toArray(function (err, documents) {
				res.send(documents);
			});
                 
                   
          
		});
		app.get('/getmap', function (req, res) {
			var result = mapsCol.find();
			result.toArray(function (err, documents) {
				res.send(documents);
			});



		});

       
           
	}
	
	
	//    console.log(user);
	console.log("okay");
        
        //Close connection
       // db.close();
});
