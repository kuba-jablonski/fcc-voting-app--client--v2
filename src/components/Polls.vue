<template>
    <main class="section">
        <div class="container">
            <div class="tile is-ancestor">
                <router-link :to="`/poll/${poll._id}`" class="tile is-parent is-6" v-for="poll in polls" :key="poll._id">
                    <article class="tile is-child box">
                        <div class="level">
                            <div class="level-item">
                                <p class="title is-3">{{poll.question}}</p>
                            </div>
                        </div>
                        <br><br>
                        <div class="columns is-mobile">
                            <div class="column is-half">
                                <div class="level-left level-item">
                                    <p>{{poll.totalVotes}} votes</p>
                                </div>
                            </div>
                            <div class="column is-half">
                                <div class="level-right level-item">
                                    <p>posted by {{poll.creatorName}}</p>
                                </div>  
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
