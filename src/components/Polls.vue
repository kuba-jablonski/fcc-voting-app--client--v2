<template>
    <div class="container">
        <div class="tile is-ancestor">
            <div class="tile is-parent is-4" v-for="poll in polls" :key="poll._id">
                <article class="tile is-child box">
                    <p class="title is-4">{{poll.question}}</p>
                    <p class="subtitle is-6">{{poll.totalVotes}} votes</p>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        polls() {
            return this.$store.state.polls;
        }
    },
    created() {
        this.$store.dispatch('getPolls');
    }
}
</script>

<style>

</style>
