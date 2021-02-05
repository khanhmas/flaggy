<template>
    <canvas id="population-chart" class="w-full h-full" ref="chart"></canvas>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Chart, ChartData, ChartOptions, ChartTooltipItem } from 'chart.js';
import chartConfig from '@/config/chart.config';

@Options({
    props: {
        population: Array,
        years: Array,
    },
})
export default class FlagChart extends Vue {
    years!: Array<number>;
    population!: Array<number>;

    chartData: ChartData = {
        datasets: [...chartConfig.datasets],
    };

    options: ChartOptions = {
        tooltips: {
            callbacks: {
                label: (
                    tooltipItem: ChartTooltipItem,
                    data: ChartData
                ): string => {
                    const label: string =
                        data.datasets![tooltipItem.datasetIndex!].label || '';
                    return label + ': ' + tooltipItem.yLabel?.toLocaleString();
                },
            },
        },
        scales: {
            ...chartConfig.options.scales
        }
    };

    chart: Chart | null = null;

    created(): void {
        this.chartData.labels = this.years;
        this.chartData.datasets![0].data = this.population;
        this.options.scales!.yAxes![0].ticks!.callback = (
            value: string | number
        ): string => value.toLocaleString();
    }

    mounted(): void {
        const canvas: HTMLCanvasElement = this.$refs.chart as HTMLCanvasElement;
        canvas.style.backgroundColor = 'white';
        this.chart = new Chart(canvas, {
            type: 'line',
            data: this.chartData,
            options: this.options,
        });
    }

    beforeDestroy(): void {
        this.chart!.destroy();
    }
}
</script>
