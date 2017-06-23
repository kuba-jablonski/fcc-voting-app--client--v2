import {
    Doughnut, mixins
} from 'vue-chartjs'

export default Doughnut.extend({
    mixins: [mixins.reactiveProp],
    mounted() {
        this.renderChart(this.chartData, {
            legend: {
                position: 'right'
            },
            responsive: true,
            maintainAspectRatio: false
        });
    }
})