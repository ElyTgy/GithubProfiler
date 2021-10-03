//Wrong user name
//not user


const username = (document.currentScript.dataset.args).toLowerCase();

const item_avatar = document.getElementById("avatar");
const item_username = document.getElementById("username");
const item_name = document.getElementById("name");
const item_company = document.getElementById("comapny");
const item_blog = document.getElementById("blog");
const item_location = document.getElementById("location");
const item_bio = document.getElementById("bio");
const item_email = document.getElementById("email");
const item_public_repos = document.getElementById("public-repos");
const item_followers = document.getElementById("followers");
const item_following = document.getElementById("following");
const item_creation_date = document.getElementById("creation-date");
const item_account_life = document.getElementById("account-life");

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
        console.dir(JSON.parse(data));
        data = JSON.parse(data);
    }

    return data;
}

function addInfo(element, data, tag=null){
    if (data){
        if(tag){
        element[tag] = data;}
        else{element.textContent = data;}
    }
    else{
        element.parentNode.removeChild(element);
    }
}

function parseDateToArr(date){
    let arr = date.split("-")
    console.log(arr);
    switch(arr[1])
    {
        case "01":
            arr[1] = "January";
            break;
        case "02":
            arr[1] = "Febrruary";
            break;
        case "03":
            arr[1] = "March";
            break;
        case "04":
            arr[1] = "April";
            break;
        case "05":
            arr[1] = "May";
            break;
        case "06":
            arr[1] = "June";
            break;
        case "07":
            arr[1] = "July";
        case "08":
            arr[1] = "August";
        case "09":
            arr[1] = "September";
        case "10":
            arr[1] = "October";
        case "11":
            arr[1] = "November";
        case "12":
            arr[1] = "December";
    }
    return arr;
}


ReqUser().then(function(data){
    addInfo(item_avatar, "src", data.avatar_url);
    addInfo(item_username, "href", data.html_url);
    addInfo(item_name, data.name);
    addInfo(item_company, data.comapny);
    addInfo(item_blog, data.blog);
    addInfo(item_location, data.location);
    addInfo(item_bio, data.bio);
    addInfo(item_email, data.email);
    addInfo(item_public_repos, data.public_repos);
    addInfo(item_followers, data.followers);
    addInfo(item_following, data.following);
    
    let creation_time = parseDateToArr(data.created_at.substring(0, data.created_at.indexOf("T")));
    addInfo(item_creation_date, `${creation_time[1]} ${creation_time[0]}`);
    addInfo(item_account_life, new Date().getFullYear() - creation_time[0]);
});
