var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var PORT = process.env.PORT | 8880;
var app = express();

app.get('/scrape', function(req, res){
res.send("Hello World");
console.log("Scraping...")
});
app.get('/', function(req, res){
res.send("Root");
})
app.listen(PORT);

console.log("Listening at http://localhost:"+PORT);
exports = module.exports = app;