<template>
    <div id="app">
        <app-login v-if="$store.state.modals.showLogin"></app-login>
        <app-signup v-if="$store.state.modals.showSignup"></app-signup>
        <app-nav></app-nav>
        <router-view></router-view>
    </div>
</template>

<script>
import Nav from './components/Nav.vue';
import Login from './components/modals/Login.vue';
import Signup from './components/modals/Signup.vue';
import Polls from './components/Polls.vue';
import Poll from './components/Poll.vue';
import Create from './components/Create.vue';

export default {
    components: {
        appNav: Nav,
        appLogin: Login,
        appSignup: Signup,
        appPolls: Polls,
        appPoll: Poll,
        appCreate: Create 
    }    
}
</script>

<style lang="scss">

</style>
