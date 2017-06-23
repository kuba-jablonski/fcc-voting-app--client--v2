import Polls from './components/Polls.vue';
import Poll from './components/Poll.vue';
import Create from './components/Create.vue';

export const routes = [
    { path: '', component: Polls },
    { path: '/poll/:id', component: Poll },
    { path: '/create', component: Create }  
];