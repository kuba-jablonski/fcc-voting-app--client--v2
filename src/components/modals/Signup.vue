<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <p class="title">Sign up</p>

                <form>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input v-model="username" class="input" type="text" placeholder="Username">
                            <span class="icon is-small is-left">
                                <i class="fa fa-user"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input v-model="password" class="input" type="password" placeholder="Password">
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </p>
                    </div>

                    <div v-if="error.show" class="notification is-danger">
                        <button @click="error.show = false" class="delete"></button>
                        {{ error.content }}
                    </div>
                 
                    <div class="field is-grouped">
                        <p class="control">
                            <button :class="{'is-loading': loading}" @click.prevent="signUp" class="button is-primary">Submit</button>
                        </p>
                        <p class="control">
                            <button @click.prevent="$store.commit('hideSignup')" class="button is-link">Cancel</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            loading: false,
            error: {
                show: false,
                content: ''
            }
        }
    },
    methods: {
        signUp() {
            if (this.username.length < 3) {
                this.error.show = true;
                this.error.content = 'The username is too short.'
                return;
            }
            if (this.password.length < 4) {
                this.error.show = true;
                this.error.content = 'The password is too short.'
                return;
            }

            this.loading = true;

            this.$store.dispatch('signupUser', {
                name: this.username,
                password: this.password
            }).catch(e => {
                console.log(e);
                this.error.show = true;
                this.error.content = 'This username already exists.';
                this.loading = false; 
            });
        }
    }
}
</script>
