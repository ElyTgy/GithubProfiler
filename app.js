const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/asyncCatch');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override'); 
const axios = require('axios');
const { allowedNodeEnvironmentFlags } = require('process');
const session = require('express-session');
const e = require('express');

const app = express();

//TODO: Fix duplicate links in ejs files with partials
//TODO: Partial for name submition form
//TODO: put parse date and months in utils.js
//TODO: After refactoring the functiond that request data from the API, add functionality to request for all data (cursor)
//TODO: Count remaining available requests and stop when there are zero left

app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded());
app.use("/public", express.static("public"));
app.use(session({secret:"Some secret", cookie:{maxAge:24*60*60*1000}, resave: false, saveUninitialized: true}))


app.get("/authorize", function(req, res){
    res.render("authorize.ejs");
})

app.post("/authorize", catchAsync(async function(req, res){
    const username = req.body.username;  //in the form the value will be sent with the name username (authorization only needs one username)
    //authorize passport using the username
    //if successful redirect to user (authore them)
    //if unsuccessful, redirect to authorize with a flash message
}))

app.get("/user", function (req, res){
    res.render("user.ejs");
    //in the front end js file, when submit button is pressed, add an element with the text loading in it
})

app.post("/user", catchAsync(async function(req, res){
    //TODO: Use flash messages instead of express errors
    for(const [key, username] of Object.entries(req.body)){
        
        let commitData;
        let userData;
        let repoData;
        let languageData = {};
        let stargazerData = {};
        if(!req.session[username]){req.session[username]={};}

        /*COMMITS */
        if(!req.session[username]["commits"]){
            try{
                commitData = (await axios.get(`https://api.github.com/search/commits?q=author:${username}`)).data.items;
                req.session[username]["commits"] = commitData.data.items;
                console.log("Just saved to storage(commit)");
            }
            catch(e){throw new ExpressError(e.response.status)}
        }
        else{
            commitData = req.session[username]["commits"];
            console.log("Already in storage(commit)");
        }

        /*USERDATA*/
        if(!req.session[username]["user"]){
            userData = (await axios.get(`https://api.github.com/users/${username}`)).data.items;
            req.session[username]["user"] = userData;
            console.log("Just saved to storage(user)");
        }
        else{
            userData = req.session[username]["user"];
            console.log("Already in storage(user)");
        }

        /*REPODATA*/
        if(!req.session[username]["repos"]){
            repoData = (await axios.get(`https://api.github.com/users/${username}/repos`)).data.items;
            req.session[username]["repos"] = repoData;
            console.log("Just saved to storage(repos)");
        }
        else{
            repoData = req.session[username]["repos"];
            console.log("Already in storage(repos)");
        }

        /*LANGUAGEDATA*/
        if(!req.session[username]["languages"]){
            for(let repo of repoData){
                languageData[repo.name] = await axios.get(`https://api.github.com/repos/ElyTgy/${repo.name}/languages`;
                req.session[username]["languages"] = languageData;
            }
            req.session[username]["languages"] = languageData;
            console.log("Just saved to storage(languages)");
        }
        else{
            console.log("Already in storage(languages)");
        }

        /*startgazwer Data*/
        if(!req.session[username]["stargazers"]){
            for(let repo of repoData){
                stargazerData[repo.name] = repo.stargazers_count;
            }
            req.session[username]["stargazers"] = stargazerData;
            console.log("Just saved to storage(stars)");
        }
        else{
            console.log("Already in storage(stars)");
        }

        res.send("hi");
        
    }
    //for each username:
    //check the session for the information on "username"
    //if info not available
        //use the info of !undefined usernames to send reqs to github api
        //pack the data in a dict
        //store data in sessios, each username will be the key of the data
    //pass the data to the ejs file and render it
}))


app.use((err, req, res, next)=>{
    if(err.repsponse && err.response.status){err.status = err.response.status;}
    let {status = 500, message="Internal Server Error"} = err
    res.status(status)
    res.render("error.ejs",{message:message, status:status, stack:err.stack, err:err});
})


app.listen(3000, ()=>{
    console.log("Serving on port 3000");
})

//note:the functions will all be in seperate js files and a script tag at the bottom of the ejs file will call them by passing the arguments