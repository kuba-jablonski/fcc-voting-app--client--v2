<template>
    <main class="section">
        <div class="container">
            <div class="tile is-ancestor">
                <router-link :to="`/poll/${poll._id}`" class="tile is-parent is-6" v-for="poll in polls" :key="poll._id">
                    <article class="tile is-child box">
                        <div class="columns">
                            <div class="column is-8">
                                <p class="title is-3">{{poll.question}}</p>
                                <p>{{poll.totalVotes}} votes</p>
                            </div>
                            <div class="column is-4">
                                
                            </div>
                        </div>
                    </article>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script>
import DoughnutChart from './chart';

export default {
    computed: {
        polls() {
            return this.$store.state.polls;
        }
    },
    components: {
        DoughnutChart
    }
}
</script>

<style>
.is-ancestor {
    flex-wrap: wrap;
}
</style>
