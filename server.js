var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var PORT = process.env.PORT | 8880;
var app = express();

app.get('/scrape', function(req, res){
	res.send("Hello World");
	console.log("Scraping...");

	url = 'http://www.imdb.com/title/tt1229340/';
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var title, release, rating;
			var json = {title: "", release: "", rating:""};

			$('.header').filter(function(){
				var data = $(this);
				title = data.children().first().text();
				
				release = data.children().last().children().text();

				json.title = title;
				json.release = release;
				
			});

			$('.star-box-details').filter(function(){
				
				rating = $(this).children().first().children().text();
			
				json.rating = rating;
			});

			// console.log(json);
			fs.writeFile('scrape-output.json', JSON.stringify(json, null, 4), function(err){
				if(err)
					console.log("Cannot write to file, scrape-output.json");
				console.log("File successfully written");
			});
		}
	});
});
app.get('/', function(req, res){
res.send("Root");
});
app.listen(PORT);

console.log("Listening at http://localhost:"+PORT);
exports = module.exports = app;