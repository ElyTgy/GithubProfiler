const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/asyncCatch');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override'); 
const axios = require('axios');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();

//TODO: Fix duplicate links in ejs files with partials
//TODO: Partial for name submition form
//TODO: put parse date and months in utils.js

app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded());
app.use("/public", express.static("public"));

app.get("/", function (req, res){
    res.render("index.ejs");
})

app.get("/user", catchAsync(async function(req, res){
    const username = req.query.username;
    const url = `https://api.github.com/users/${username}`;
    data = (await axios.get(url)).data;
    if(data.type !== "User"){
        throw new ExpressError("This platform only supports accounts registered as users for now", 418);
    }
    res.render("stats.ejs", {"_username":username});
}))

app.get("/test", function (req, res){
    res.render("test.ejs");
})


app.use((err, req, res, next)=>{
    let {status = 500, message="Internal Server Error"} = err
    if(message.includes("403")){message="You have the maximum number of requests you can send in one hour :("};
    if(message.includes("404")){message="Something went wrong, please make sure you entered the correct username"};
    res.status(status)
    res.render("error.ejs",{message:message, status:status, err:err});
})


app.listen(3000, ()=>{
    console.log("Sercing on port 3000");
})