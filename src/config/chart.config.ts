export default {
    datasets: [
        {
            label: 'Population',
            fill: false,
            borderColor: 'red',
            backgroundColor: 'black',
            pointBackgroundColor: 'yellow',
            pointBorderColor: 'green',
            pointHoverBackgroundColor: 'red',
            borderWidth: 1,
        },
    ],
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'black',
                    },
                    gridLines: {
                        zeroLineColor: 'black',
                        tickMarkLength: 1,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: 'black',
                    },
                    gridLines: {
                        zeroLineColor: 'black',
                    },
                },
            ],
        },
        responsive: true,
        maintainAspectRatio: false,
    }
};
