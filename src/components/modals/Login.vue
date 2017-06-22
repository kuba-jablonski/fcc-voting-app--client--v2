<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <p class="title">Log In</p>
                <form>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input class="input" type="text" placeholder="Username">
                            <span class="icon is-small is-left">
                                <i class="fa fa-user"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control has-icons-left">
                            <input class="input" type="password" placeholder="Password">
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field is-grouped">
                        <p class="control">
                            <button class="button is-primary">Submit</button>
                        </p>
                        <p class="control">
                            <button @click.prevent="$store.commit('hideLogin')" class="button is-link">Cancel</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
