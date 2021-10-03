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

function RenderBarChart(elementId, labels, data, 
    backgroundColor=['rgba(255, 99, 132, 1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)','rgba(75, 192, 192, 1)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'],)
{
    let changeItemColor = (item) => {
        item.scaleLabel.fontColor = rgba(255, 255, 255, 1);
        item.ticks.fontColor = rgba(255, 255, 255, 1);
        item.ticks.minor.fontColor = rgba(255, 255, 255, 1);
        item.ticks.major.fontColor = rgba(255, 255, 255, 1);
    };

    
    var ctx = document.getElementById(elementId);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data:
        {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColor
            }]
        },
        options: {
        legend:{labels: {fontColor: 'orange'}},
        title: {
                display: true,
                fontColor: 'blue',
                text: 'Custom Chart Title'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: 'red'
                    },
                }],
            xAxes: [{
                    ticks: {
                        fontColor: 'green'
                    },
                }]
            },
            plugins: {
                legend: {
                display: false
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

       colors = []
       for(let i = 0; i < 12; i++)
       {
           colors.push(RandomRGB(1))
       }

       RenderBarChart("monthVsCommits", Object.keys(monthsCount), Object.values(monthsCount), colors,)
});
