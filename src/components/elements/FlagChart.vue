<template>
    <canvas id="population-chart" class="w-full h-full" ref="chart"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Chart, ChartData, ChartOptions } from 'chart.js';

@Options({
    props: {
        population: Array,
        years: Array
    }
})
export default class FlagChart extends Vue {
    years!: Array<number>;
    population!: Array<number>;

    chartData: ChartData = {
        // labels: [
        //     'Babol',
        //     'Cabanatuan',
        //     'Daegu',
        //     'Jerusalem',
        //     'Fairfield',
        //     'New York',
        //     'Gangtok',
        //     'Buenos Aires',
        //     'Hafar Al-Batin',
        //     'Idlib',
        // ],
        datasets: [
            {
                label: 'Population',
                // data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
                fill: false,
                borderColor: 'red',
                backgroundColor: 'black',
                pointBackgroundColor: 'yellow',
                pointBorderColor: 'green',
                pointHoverBackgroundColor: 'red',
                borderWidth: 1,
            },
        ],
    };

    options: ChartOptions = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data): string => {
                    const label: string = data.datasets![tooltipItem.datasetIndex!].label || '';
                    return label + ': ' + tooltipItem.yLabel?.toLocaleString();
                }
            }
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'black',
                        callback: (value)  => {
                            return value.toLocaleString();
                        }
                    },
                    gridLines: {
                        zeroLineColor: 'black',
                        tickMarkLength: 1
                        // color: 'transparent'
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: 'black'
                    },
                    gridLines: {
                        // drawTicks: false,
                        zeroLineColor: 'black',
                        // color: 'transparent'
                    },
                },
            ],
        },
        // legend: {
        //     display: true,
        // },
        responsive: true,
        maintainAspectRatio: false,
    };

    chart: Chart | null = null;

    created(): void {
        this.chartData.labels = this.years;
        this.chartData.datasets![0].data = this.population;
    }

    mounted(): void {
        // Chart.defaults.global.defaultFontColor = 'red';
        const canvas: HTMLCanvasElement = this.$refs.chart as HTMLCanvasElement;
        canvas.style.backgroundColor = 'white';
        // canvas.height = 500;
        this.chart = new Chart(canvas, {
            type: 'line',
            data: this.chartData,
            options: this.options
        })
    }

    beforeDestroy(): void {
        this.chart?.destroy();
    }
}
</script>
