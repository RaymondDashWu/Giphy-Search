var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


//To-fix: Nothing on root page
app.get('/', function (req, res) {
	if (req.query.term) {
		 	giphy.search(req.query.term, function (err, response) {
   		res.render('home', {gifs: response.data})
   		  });
  	console.log(response);
	} else {
		giphy.trending(function (err, response) {
   			res.render('home', {gifs: response.data});
   		  });

	}


});

app.get('/hello-squirrel', function (req, res) {
 	res.send('Hello Squirrel');
});
app.get('/hello-gif', function (req, res) {
 	var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
 	res.render('hello-gif', {gifUrl: gifUrl})
})

app.listen(3000, function () {
 	console.log('Gif Search listening on port localhost:3000!');
});
