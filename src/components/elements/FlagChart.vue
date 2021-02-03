<template>
    <canvas ref="chart"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Chart } from 'chart.js';

@Options({})
export default class FlagChart extends Vue {
    chartData: any = {
        labels: [
            'Babol',
            'Cabanatuan',
            'Daegu',
            'Jerusalem',
            'Fairfield',
            'New York',
            'Gangtok',
            'Buenos Aires',
            'Hafar Al-Batin',
            'Idlib',
        ],
        datasets: [
            {
                label: 'Population',
                data: [600, 1150, 342, 6050, 2522, 3241, 1259, 157, 1545, 9841],
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

    options: any = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        fontColor: 'black'
                    },
                    gridLines: {
                        zeroLineColor: 'black',
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

    mounted(): void {
        // Chart.defaults.global.defaultFontColor = 'red';
        const canvas: HTMLCanvasElement = this.$refs.chart as HTMLCanvasElement;
        canvas.style.backgroundColor = 'white';
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
