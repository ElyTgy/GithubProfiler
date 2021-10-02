const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
//const catchAsync = require('./utils/catchAsync');
// /const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override'); 
const { readdirSync } = require('fs');
const app = express();

//TODO: Fix duplicate links in ejs files with partials
//TODO: Cache data after fetching it
//TODO: Partial for name submition form

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

app.post("/user", function(req, res){
    res.render("stats.ejs");
})

app.listen(3000, ()=>{
    console.log("Sercing on port 3000");
})