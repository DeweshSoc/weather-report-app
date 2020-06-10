const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

        res.sendFile(__dirname+"/index.html");
});
app.get("/longlat",function(req,res){

    res.sendFile(__dirname+"/longlat.html");
});
app.get("/pincode",function(req,res){

    res.sendFile(__dirname+"/pincode.html");
});

app.post("/",function(req,res){
    const q = req.body.cityname;
    const apikey = "b600d36ad9f930b5b15ebe051839c5cc";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ q +"&appid="+apikey;
    https.get(url,function(response){
        if(response.statusCode!=200){
            res.send("Sorry something went wrong!");
        }

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const cityName = weatherData.name;
            const humidity = weatherData.main.humidity;
            const feelsLike = weatherData.main.feels_like;
            res.write("<h1>The temperature is "+ temp +"K and it's "+ description +" in "+ cityName +".</h1>");
            res.write("<h1>Though it feels like "+ feelsLike +"K , humidity is "+ humidity +"% .</h1>")
            res.end();
        })
    });

});
app.post("/longlat",function(req,res){
    const long = req.body.long;
    const lat = req.body.lat;
    const apikey = "b600d36ad9f930b5b15ebe051839c5cc";
    const url = "https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon=" + long + "&appid="+apikey;

    https.get(url,function(response){
        if(response.statusCode!=200){
            res.send("Sorry something went wrong!");
        }

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const cityName = weatherData.name;
            const humidity = weatherData.main.humidity;
            const feelsLike = weatherData.main.feels_like;
            res.write("<h1>The temperature is "+ temp +"K and it's "+ description +" in "+ cityName +".</h1>");
            res.write("<h1>Though it feels like "+ feelsLike +"K , humidity is "+ humidity +"% .</h1>")
            res.end();
        });
    });

});
app.post("/pincode",function(req,res){
    const zip = req.body.zipcode;
    const countryCode = req.body.countrycode;
    const apikey = "b600d36ad9f930b5b15ebe051839c5cc";
    const url = "https://api.openweathermap.org/data/2.5/weather?zip="+ zip +","+ countryCode +"&appid="+apikey;
    https.get(url,function(response){
        if(response.statusCode!=200){
            res.send("Sorry something went wrong!");
        }

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const cityName = weatherData.name;
            const humidity = weatherData.main.humidity;
            const feelsLike = weatherData.main.feels_like;
            res.write("<h1>The temperature is "+ temp +"K and it's "+ description +" in "+ cityName +".</h1>");
            res.write("<h1>Though it feels like "+ feelsLike +"K , humidity is "+ humidity +"% .</h1>")
            res.end();
        });
    });

});



app.listen (5500,function(){
    console.log("server on port 5500");
});
