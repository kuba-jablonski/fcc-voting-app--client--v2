<template>
    <div id="app">
        <app-login v-if="$store.state.modals.showLogin"></app-login>
        <app-signup v-if="$store.state.modals.showSignup"></app-signup>
        <app-nav></app-nav>
        <app-polls></app-polls>
    </div>
</template>

<script>
import Nav from './components/Nav.vue';
import Login from './components/modals/Login.vue';
import Signup from './components/modals/Signup.vue';
import Polls from './components/Polls.vue';

export default {
    components: {
        appNav: Nav,
        appLogin: Login,
        appSignup: Signup,
        appPolls: Polls
    }
}
</script>

<style lang="scss">

</style>
