import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        modals: {
            showLogin: false,
            showSignup: false
        },
        polls: null,
        user: null,
        colors: []
    },
    getters: {
        pollChartData: state => id => {
            let datacollection = {
                labels: [],
                datasets: [{
                    label: 'Votes',
                    backgroundColor: state.colors,
                    data: []
                }]
            };

            state.polls
                .find(poll => poll._id === id).options
                .forEach(option => {
                    datacollection.labels.push(option.option);
                    datacollection.datasets[0].data.push(option.votes);
                });

            return datacollection;
        }
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
        },
        getUser(state, user) {
            state.user = user;
        },
        logoutUser(state) {
            state.user = null;
        },
        getRandomColors(state, n) {
            state.colors = [];
            for (let i = 0; i < n; i++) {
                state.colors.push('#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6))
            }
        }
    },
    actions: {
        getPolls({
            commit
        }) {
            return new Promise((resolve, reject) => {
                Vue.http.get('https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/polls')
                    .then(response => resolve(response), e => reject(e));
            })
        },
        signupUser({
            commit
        }, credentials) {
            Vue.http.post('https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/users', credentials)
                .then(response => {
                    Vue.http.headers.common['x-auth'] = response.headers.map['X-Auth'][0];
                    commit('getUser', response.body);
                    commit('hideSignup');
                })
                .catch(e => console.log(e));
        },
        loginUser({
            commit
        }, credentials) {
            Vue.http.post('https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/users/login', credentials)
                .then(response => {
                    Vue.http.headers.common['x-auth'] = response.headers.map['X-Auth'][0];
                    commit('getUser', response.body);
                    commit('hideLogin');
                })
                .catch(e => console.log(e));
        },
        logoutUser({
            commit
        }) {
            return new Promise((resolve, reject) => {
                Vue.http.delete('https://cors-anywhere.herokuapp.com/http://voteserver.herokuapp.com/users/me/token')
                    .then(response => resolve(response), e => reject(e));
            })
        }
    }
});