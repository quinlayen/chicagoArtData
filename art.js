
const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


var query_word = "hawaiian"; // Default search word is hawaiian

// If keyword specified in command line then use it
if (process.argv.length > 2){
    query_word = process.argv[2]
}

// Send query to the Chicago museum site
let url = ("https://www.artic.edu/collection?q=" + query_word);

request(url, (e, response, body) => {
    if (e) {
        console.error(e)
    }
    try {
        const $ = cheerio.load(body)
       
        var links=[];
        $("#artworksList").children().each(function(){
            $link = $(this).find("a").attr('href')
            links.push($link)
        })

        if (links.length > 0){
            console.log("Found " + links.length + " '"+query_word+"' pictures.\n");
            links.forEach(function(item) {
                console.log(item);
            });
        }else{
            console.log("No image found for '"+query_word+"'");
        }
        
    } 
    
    catch(e) {
        console.error(e)
        }
    })

app.listen(PORT, ()=> {
    console.log('The art server is listing on ' + PORT)
})
