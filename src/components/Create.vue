<template>
    <main class="section">
        <div class="container">
            <h1 class="title">Create a new poll</h1>
            
                <div class="field">
                    <p class="control">
                        <input v-model="title" class="input is-medium" type="text" placeholder="Title">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <input v-model="options[0]" class="input" type="text" placeholder="First option">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <input v-model="options[1]" class="input" type="text" placeholder="Second option">
                    </p>
                </div>
                <div v-for="(option, i) in additionalOptions" class="field">
                    <p class="control">
                        <input v-model="additionalOptions[i]" class="input" type="text" placeholder="Additional option">
                    </p>
                </div>
                <div class="field is-grouped">
                    <p class="control is-expanded">
                        <input v-model="additionalOption" @keyup.enter="addOption" class="input" type="text" placeholder="Additional option(s)">
                    </p>
                    <p class="control">
                        <a @click="addOption" class="button">
                            Add
                        </a>
                    </p>
                </div>
                <div class="field is-grouped">
                    <p class="control">
                        <button @click.prevent="submitPoll" :class="{'is-loading': loading}" class="button is-primary">Submit</button>
                    </p>
                    <p class="control">
                        <button @click.prevent="$router.push('/')" class="button is-link">Cancel</button>
                    </p>
                </div>
            
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            options: ['', ''],
            additionalOption: '',
            additionalOptions: [],
            loading: false
        }
    },
    methods: {
        addOption() {
            this.additionalOptions.push(this.additionalOption);
            this.additionalOption = '';
        },
        submitPoll() {
            this.loading = true;
            let pollId;
            const options = [...this.options, ...this.additionalOptions]
                .filter(value => value != '')
                .map(value => {
                    return { option: value }
                });


            this.$http.post('https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/polls', {
                question: this.title,
                options: options
            }).then((response) => {
                pollId = response.body._id;
                return this.$store.dispatch('getPolls');
            }).then(response => {
                this.$store.commit('getPolls', response.body);
                this.loading = false;
                this.$router.push(`/poll/${pollId}`);
            }).catch(e => console.log(e));
        }
    }
}
</script>

<style>

</style>
