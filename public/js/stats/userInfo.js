let username = (document.currentScript.dataset.args).toLowerCase();

const item_avatar = document.getElementById("avatar");
const item_username = document.getElementById("username");
const item_name = document.getElementById("name");

const item_company = document.querySelector("#comapny .value");
const item_blog = document.querySelector("#blog .value");
const item_location = document.querySelector("#location .value");
const item_email = document.querySelector("#email .value");
const item_public_repos = document.querySelector("#public-repos .value");
const item_followers = document.querySelector("#followers .value");
const item_following = document.querySelector("#following .value");
const item_creation_date = document.querySelector("#creation-date .value");
const item_account_life = document.querySelector("#account-life .value");

async function ReqUser(){
    let data = localStorage.getItem(username);
    if(!data){
        const url = `https://api.github.com/users/${username}`;
        data = (await axios.get(url)).data;
        localStorage.setItem(username, JSON.stringify(data));
        console.log("Sent request to API");
    }
    else{
        console.log("already have data");
        data = JSON.parse(data);
    }
    return data
}

function addInfo(element, value, tag=null){
    if(!element){return;}
    if (value){
        if(tag){
        element[tag] = value;}
        else{element.textContent = value;}
    }
    else{
        const parent = element.parentNode
        if(parent.tagName == "SECTION"){
            parent.parentNode.removeChild(parent);
        }
        else{
            parent.removeChild(element);
        }
    }
}

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function parseDateToArr(date){
    let arr = date.split("-")
    switch(arr[1])
    {
        case "01":
            arr[1] = months[0];
            break;
        case "02":
            arr[1] = months[1];
            break;
        case "03":
            arr[1] = months[2];
            break;
        case "04":
            arr[1] = months[3];
            break;
        case "05":
            arr[1] = months[4];
            break;
        case "06":
            arr[1] = months[5];
            break;
        case "07":
            arr[1] = months[6];
            break;
        case "08":
            arr[1] = months[7];
            break;
        case "09":
            arr[1] = months[8];
            break;
        case "10":
            arr[1] = months[9];
            break;
        case "11":
            arr[1] = months[10];
            break;
        case "12":
            arr[1] = months[11];
            break;
    }
    return arr;
}
function GetDateISO8601(str)
{return str.substring(0, str.indexOf("T"));}


ReqUser().then(function(data){
    addInfo(item_avatar, data.avatar_url, "src");
    addInfo(item_username, data.html_url, "href");
    addInfo(item_name, data.name);
    addInfo(item_company, data.comapny);
    addInfo(item_blog, data.blog);
    if(document.querySelector("#blog .value"))
    {addInfo(item_blog, data.blog, "href");}
    addInfo(item_location, data.location);
    addInfo(item_email, data.email);
    addInfo(item_public_repos, data.public_repos);
    addInfo(item_followers, data.followers);
    addInfo(item_following, data.following);
    
    let creation_time = parseDateToArr(GetDateISO8601(data.created_at));
    addInfo(item_creation_date, `${creation_time[1]} ${creation_time[0]}`);
    addInfo(item_account_life, `${new Date().getFullYear() - creation_time[0]} years ago`);
});
