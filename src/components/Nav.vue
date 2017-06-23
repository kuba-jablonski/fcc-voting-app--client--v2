<template>
    <nav class="nav has-shadow">
        <div class="nav-left">
            <router-link to="/" tag="a" class="nav-item is-active">
                <img src="../assets/napstalogo-small.png" alt="napstalogo">
                Voting App
            </router-link>
        </div>
    
        <div class="nav-center">
            <a href="https://github.com/kuba-jablonski/fcc-voting-app--client--v2" class="nav-item">
                <span class="icon">
                    <i class="fa fa-github"></i>
                </span>
                napstablook
            </a>
            <!--<a class="nav-item">
                <span class="icon">
                    <i class="fa fa-twitter"></i>
                </span>
            </a>-->
        </div>
    
        <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
        <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
        <span @click="showDropdown = !showDropdown" class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </span>
    
        <!-- This "nav-menu" is hidden on mobile -->
        <!-- Add the modifier "is-active" to display it on mobile -->
        <div :class="{'is-active': showDropdown}" class="nav-right nav-menu">

            <router-link to="/" tag="a" class="nav-item" active-class="is-active" exact>Polls</router-link>
            <!--<a v-if="$store.state.user" class="nav-item">
                Create Poll
            </a>-->
            <router-link v-if="$store.state.user" to="/create" tag="a" class="nav-item" active-class="is-active" exact>Create Poll</router-link>
    
            <div v-if="!$store.state.user" class="nav-item">
                <div class="field is-grouped">
                    <p class="control">
                        <a @click="$store.commit('showLogin')" class="button is-primary">
                            <span class="icon">
                                <i class="fa fa-sign-in"></i>
                            </span>
                            <span>Login</span>
                        </a>
                    </p>
                    <p class="control">
                        <a @click="$store.commit('showSignup')" class="button is-primary">
                            <span class="icon">
                                <i class="fa fa-user-plus"></i>
                            </span>
                            <span>Signup</span>
                        </a>
                    </p>
                </div>
            </div>

            <div v-else class="nav-item">
                <div class="field is-grouped">
                    <p class="control">
                        <a :class="{'is-loading': loading}" @click="logOut" class="button is-primary">
                            <span class="icon">
                                <i class="fa fa-sign-out"></i>
                            </span>
                            <span>Logout</span>
                        </a>
                    </p>
                </div>
            </div>

        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showDropdown: false,
            loading: false
        }
    },
    methods: {
        logOut() {
            this.loading = true;
            this.$store.dispatch('logoutUser')
                .then(response => {
                    this.$http.headers.common['x-auth'] = null;
                    this.$store.commit('logoutUser');
                    this.loading = false;
                })
                .catch(e => console.log(e));
        }
    }
}
</script>

<style>

</style>
