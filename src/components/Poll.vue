<template>
    <main class="section">
        <div class="container">
            <h1 v-if="!poll" class="title is-4 has-text-centered">This poll does not exist.</h1>
            <div v-else class="columns">
                <div class="column is-6">
                    <nav class="panel">
                        <p class="panel-heading">
                            {{ poll.question }}
                        </p>
                        <a 
                            v-for="option in poll.options" 
                            @click="selectedOption = option._id" 
                            :key="option._id" 
                            :class="{'is-active': option._id === selectedOption}" 
                            class="panel-block"
                        >
                            <span class="panel-icon">
                                <i :class="{
                                    'fa-circle-o': !(option._id === selectedOption),
                                    'fa-check-circle-o': option._id === selectedOption
                                }" class="fa"></i>
                            </span>
                            {{ option.option }}
                        </a>
                        <div v-if="!$store.state.user" class="panel-block">
                            <button disabled class="button is-primary is-outlined is-fullwidth">
                                Log in to vote!
                            </button>
                        </div>
                        <div v-else-if="poll.voters.includes($store.state.user._id)" class="panel-block">
                            <button disabled class="button is-primary is-outlined is-fullwidth">
                                Thanks for voting!
                            </button>
                        </div>
                        <div v-else class="panel-block">
                            <button @click="submitVote" class="button is-primary is-outlined is-fullwidth">
                                Submit your vote!
                            </button>
                        </div>
                        <div v-if="$store.state.user && poll.creatorName === $store.state.user.name" class="panel-block">
                            <button @click="deletePoll" class="button is-danger is-outlined is-fullwidth">
                                Delete this poll.
                            </button>
                        </div>
                    </nav>
                </div>
                <div class="column is-6">
                    <doughnut-chart :chart-data="$store.getters.pollChartData($route.params.id)"></doughnut-chart>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import DoughnutChart from './chart';

export default {
    created() {
        this.$store.commit('getRandomColors', this.poll.options.length);
    },
    data() {
        return {
            selectedOption: '',
        }
    },
    computed: {
        poll() {
            return this.$store.state.polls
                .find(poll => poll._id === this.$route.params.id);
        }
    },
    methods: {
        submitVote() {
            this.$http.patch(`https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/polls/${this.$route.params.id}/${this.selectedOption}`)
                .then(response => {
                    this.$store.commit('getPolls', response.body);
                }).catch(e => console.log(e));
        },
        deletePoll() {
            this.$http.delete(`https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/polls/me/${this.$route.params.id}`)
                .then(response => {
                    this.$store.commit('getPolls', response.body);
                    this.$router.push('/');
                }).catch(e => console.log(e));
        }
    },
    components: {
        doughnutChart: DoughnutChart
    }
}
</script>

<style scoped>

</style>

