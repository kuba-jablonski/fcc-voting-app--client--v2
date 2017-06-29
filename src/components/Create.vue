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
                <div v-for="(option, i) in additionalOptions" :key="i" class="field">
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

                <div v-if="error.show" class="notification is-danger">
                    <button @click="error.show = false" class="delete"></button>
                    {{ error.content }}
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
            loading: false,
            error: {
                show: false,
                content: ''
            }
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
            const title = this.title.trim();
            const options = [...this.options, ...this.additionalOptions]
                .filter(value =>{
                    return value.trim() != ''
                })
                .map(value => {
                    return { option: value }
                });

            if (title == '' || options.length < 2) {
                this.error.show = true;
                this.error.content = 'Poll needs a title and 2 or more options.';
                this.loading = false;
                return;
            } 

            this.$http.post('https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/polls', {
                question: title,
                options: options
            }).then(response => {
                this.$store.commit('getPolls', response.body);
                this.loading = false;
                this.$router.push('/');
            }).catch(e => console.log(e));
        }
    }
}
</script>

<style>

</style>
