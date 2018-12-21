const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

request('https://www.artic.edu/artworks/27992/a-sunday-on-la-grande-jatte-1884', (e, response, body) => {
  if (e) {
    console.error(e)
  }

  try {
    const $ = cheerio.load(body)
    var re_cm = new RegExp(/([\d\.]+) × ([\d\.]+) cm/);

    $( "#dl-artwork-details").children().each(function() {
        var $dt = $(this);
        var $dd = $dt.nextUntil('dt');
        
        if ( $dt.text().trim() === "Dimensions" ){
            var trimedLine = $dd.text().trim();
   
            if (re_cm.test(trimedLine)) {
                var size = trimedLine.match(re_cm);
                console.log("size (h,w) = (" + size[1] + " cm, " + size[2] + " cm)");
            } else {
                // Unknown format
                console.log(trimedLine);
            }
        } else {
	        //console.log($dt.text().trim());
	    }
     });
  } catch (e) {
    console.error(e)
  }
});

  



app.listen(PORT, ()=> {
    console.log('The dimension server is listing on ' + PORT)
})