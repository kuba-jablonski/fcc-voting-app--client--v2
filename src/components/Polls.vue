<template>
    <main class="section">
        <div class="container">
            <div class="tile is-ancestor">
                <router-link :to="`/poll/${poll._id}`" class="tile is-parent is-6" v-for="poll in polls" :key="poll._id">
                    <article class="tile is-child box">
                        <p class="title is-4">{{poll.question}}</p>
                        <p class="subtitle is-6">{{poll.totalVotes}} votes</p>
                    </article>
                </router-link>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    computed: {
        polls() {
            return this.$store.state.polls;
        }
    }
}
</script>

<style>
.is-ancestor {
    flex-wrap: wrap;
}
</style>
