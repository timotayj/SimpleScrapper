var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

app.get("/scrape", function(req,res){
	
	url = 'http://www.imdb.com/title/tt1229340/'; //change this URL to website you wish to scrape 
	
	request(url, function(error, response, html){
		
		if(!error){
			
			var $ = cheerio.load(html);
			
			var title, release, rating;
			var json = {title:"",release:"",rating:""};
			
			//finds DOM element with relivent info
			$(".title_wrapper").filter(function(){
				
				var data = $(this);
				title = data.children().first().text();
				release = data.children().last().children().last().text();
				//adds to json file
				json.title =title;
				json.release =release;
				
			})
			
			
			//seperate query for rating value
			$(".ratingValue").filter(function(){
				
				var data = $(this);
				rating = data.children().first().text();
				json.rating = rating;
				
			})
			
			
			
			
		}
		//writes json file to file server
		fs.writeFile("output.json", JSON.stringify(json, null, 4), function(err){
			
			console.log("File written")
			
		})
		
		res.send("check console")
		
		
		
	});
	
	
})

app.listen("8080");
console.log("port 8080");
exports = module.exports = app;


