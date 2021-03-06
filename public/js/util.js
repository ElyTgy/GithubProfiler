
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const weekdays = ["Sunday","Monday","Teusday","Wendsday","Thursday","Friday","Saturday"];

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

function RandomRGB(a){
    const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b =  Math.round(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function RenderChart(chartType, elementId, _label, _data, _backgroundColor, hasLegend=false)
{
    let ctx = document.getElementById(elementId).getContext('2d');
    let myChart = new Chart(ctx, {
    type: chartType,
    data: {
        datasets: [{
        data: _data,
        backgroundColor: _backgroundColor
        }],
        labels: _label
    },
    options: {
        responsive: true,
        plugins: {
        datalabels: {
            color: '#fff',
            anchor: 'end',
            align: 'start',
            offset: -10,
            borderWidth: 2,
            borderColor: '#fff',
            borderRadius: 25,
            backgroundColor: (context) => {
            return context.dataset.backgroundColor;
            },
            font: {
            weight: 'bold',
            size: '10'
            },
            formatter: (value) => {
            return value + ' %';
            }
        }
        }
    }
    })

    if(!hasLegend)
    {
        myChart.options.plugins.legend.display = false;
        myChart.update();
    }
}
