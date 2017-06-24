import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App.vue';

import { store } from './store/store';
import { routes } from './routes';

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
	routes,
    mode: 'history'
});


store.dispatch('getPolls').then((response) => {
    store.commit('getPolls', response.body);
    
    new Vue({
        el: '#app',
        store, router,
        render: h => h(App)
    });
}).catch(e => console.log(e));