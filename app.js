const express = require("express");
const { STATUS_CODES } = require("http");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
 
});
app.post("/", function(req, res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "a8d624adeabceb187e2d8dbcbe1820e1";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid="+ apiKey;
    https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherdata = JSON.parse(data);
        const temp = weatherdata.main.temp
        const weatherDescription = weatherdata.weather[0].description
        const icon = weatherdata.weather[0].icon
        const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The Weather is Currently "+ weatherDescription + "<p>");
        res.write("<h1>The Temp in "+ query +" is " + temp + " Degrees Celcius.</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send()  
    });
    });

});




app.listen(3000, function(){
    console.log("Server is running on Port:3000");

});