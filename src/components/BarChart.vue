<template>
    <div>
        <Bar :data="chartData" />
    </div>
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        labels: Array,
        datasets: Array
    },
    computed: {
        chartData() {
            return {
                labels: this.labels,
                datasets: this.datasets
            };
        }
    }
};
</script>

<style scoped></style>