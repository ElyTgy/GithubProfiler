const commits = document.getElementById("commits");

async function ReqCommits(){
    let data = sessionStorage.getItem(`${username}.commits`);
    if(!data){
        const url = `https://api.github.com/search/commits?q=author:${username}`;
        data = (await axios.get(url)).data;
        sessionStorage.setItem(`${username}.commits`, JSON.stringify(data));
        console.log("Sent request to API(commits)");
    }
    else{
        console.log("already have data(commmit)");
        console.dir(JSON.parse(data));
        data = JSON.parse(data);
    }
    return data
}

function CommitsVSTimeBar(data){
    monthsCount = {};
    months.forEach(month=>{
        monthsCount[month] = 0;
    })
     data.items.forEach(element => {
         let month = parseDateToArr(GetDateISO8601(element.commit.author.date))[1];
         monthsCount[month] += 1;
    });
    console.log(monthsCount);

    colors = []
    for(let i = 0; i < 12; i++)
    {
        colors.push(RandomRGB(1))
    }

    RenderChart('line', "monthVsCommits", Object.keys(monthsCount), Object.values(monthsCount), colors,)
}
function CommitsVSDayPie(data){
    dayCount = {};
    weekdays.forEach(weekdays=>{
        dayCount[weekdays] = 0;
    })
     data.items.forEach(element => {
         let day = new Date(element.commit.author.date);
         dayCount[weekdays[day.getDay()]] += 1;
    });
    
    colors = []
    for(let i = 0; i < 7; i++)
    {
        colors.push(RandomRGB(1))
    }
    RenderChart('pie', "dayVsCommits", Object.keys(dayCount), Object.values(dayCount), colors, hasLegend=true);
}

ReqCommits().then(function(data){
    CommitsVSTimeBar(data);
    CommitsVSDayPie(data)
});
