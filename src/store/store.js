import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modals: {
            showLogin: false,
            showSignup: false
        },
        polls: null
    },
    mutations: {
        showLogin(state) {
            state.modals.showLogin = true;
        },
        showSignup(state) {
            state.modals.showSignup = true;
        },
        hideLogin(state) {
            state.modals.showLogin = false;
        },
        hideSignup(state) {
            state.modals.showSignup = false;
        },
        getPolls(state, polls) {
            state.polls = polls;
        }
    },
    actions: {
        getPolls({commit}) {
            Vue.http.get('https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/polls')
                .then(response => commit('getPolls', response.body))
                .catch(e => console.log(e));
        }
    }
});