const commits = document.getElementById("commits");

async function ReqCommits(){
    let data = localStorage.getItem(`${username}.commits`);
    if(!data){
        const url = `https://api.github.com/search/commits?q=author:${username}`;
        data = (await axios.get(url)).data;
        localStorage.setItem(`${username}.commits`, JSON.stringify(data));
        console.log("Sent request to API(commits)");
    }
    else{
        console.log("already have data(commmit)");
        console.dir(JSON.parse(data));
        data = JSON.parse(data);
    }
    return data
}

function RenderBarChart(elementId, labels, data, title, xlabel, ylabel, 
    backgroundColor=['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'],
    borderColor=['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'])
{
    var ctx = document.getElementById(elementId).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

ReqCommits().then(function(data){
       monthsCount = {};
       months.forEach(month=>{
           monthsCount[month] = 0;
       })
        data.items.forEach(element => {
            let month = parseDateToArr(GetDateISO8601(element.commit.author.date))[1];
            monthsCount[month] += 1;
       });
       console.log(monthsCount);
       RenderBarChart("monthVsCommits", Object.keys(monthsCount), Object.values(monthsCount), "Commits Vs. Month", 'a', 'b');
});