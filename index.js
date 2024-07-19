import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app=express();
const port= 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
const API_url="https://api.openweathermap.org/data/2.5/weather?appid=726ab1852858b71875219fef631e5548&";
const forecast_url="https://api.openweathermap.org/data/2.5/forecast?appid=726ab1852858b71875219fef631e5548&"
const date = new Date();
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let d=weekday[date.getDay()];
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${d}, ${day}-${month}-${year}`;
const imgurl="https://openweathermap.org/img/w/"

app.get("/", async(req,res)=>{
    const response= await axios.get(API_url + "q=Dehradun");
    const result=response.data;
    
    res.render("index.ejs",{
        CityName:"Dehradun",
        Date:currentDate,
        Temperature:Math.ceil(result.main.temp - 273),
        icon:imgurl + result.weather[0].icon+".png",
        WeaCond:result.weather[0].description.charAt(0).toUpperCase() + result.weather[0].description.slice(1,result.weather[0].description.length),
        WindSpeed:result.wind.speed,
        Humidity:result.main.humidity,
     
    });
});

app.post("/search", async (req,res)=>{
    const city=req.body.searchbox;
    const response= await axios.get(API_url + "q=" + city);
    const result=response.data;
  
try{


    res.render("index.ejs",{
        CityName:result.name,
        Date:currentDate,
        Temperature:Math.ceil(result.main.temp - 273),
        icon:imgurl + result.weather[0].icon+".png",
        WeaCond:result.weather[0].description.charAt(0).toUpperCase() + result.weather[0].description.slice(1,result.weather[0].description.length),
        WindSpeed:result.wind.speed,
        Humidity:result.main.humidity,
    });
}
catch(error){
    const response= await axios.get(API_url + "q=Dehradun");
    const result=response.data;
    res.render("index.ejs",{
        CityName:"Dehradun",
        Date:currentDate,
        Temperature:Math.ceil(result.main.temp - 273),
        icon:imgurl + result.weather[0].icon+".png",
        WeaCond:result.weather[0].description.charAt(0).toUpperCase() + result.weather[0].description.slice(1,result.weather[0].description.length),
        WindSpeed:result.wind.speed,
        Humidity:result.main.humidity,
        error:"City does not exist,Try again"
     
    });
}
    });


app.listen(port,()=>{
    console.log(`Server running on ${port}..`);
});