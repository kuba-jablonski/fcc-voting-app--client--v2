<template>
    <nav class="nav has-shadow">
        <div class="nav-left">
            <a class="nav-item">
                <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
            </a>
        </div>
    
        <div class="nav-center">
            <a class="nav-item">
                <span class="icon">
                    <i class="fa fa-github"></i>
                </span>
            </a>
            <a class="nav-item">
                <span class="icon">
                    <i class="fa fa-twitter"></i>
                </span>
            </a>
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
            <a class="nav-item is-active">
                Home
            </a>
            <a v-if="$store.state.user" class="nav-item">
                Create Poll
            </a>
    
            <div v-if="!$store.state.user" class="nav-item">
                <div class="field is-grouped">
                    <p class="control">
                        <a @click="$store.commit('showLogin')" class="button">
                            <span class="icon">
                                <i class="fa fa-sign-in"></i>
                            </span>
                            <span>Login</span>
                        </a>
                    </p>
                    <p class="control">
                        <a @click="$store.commit('showSignup')" class="button">
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
                        <a :class="{'is-loading': loading}" @click="logOut" class="button">
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
            this.$store.dispatch('logoutUser');
        }
    }
}
</script>

<style>

</style>
