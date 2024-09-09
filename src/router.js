import { createRouter, createWebHistory } from 'vue-router';
import AppHomepage from './pages/AppHompage.vue';
import AppSuites from './pages/AppSuites.vue';
import AppSingleSuite from './pages/AppSingleSuite.vue';
// import AppProjects from './pages/AppProjects.vue';
// import AppContacts from './pages/AppContacts.vue';
// import SingleProject from './pages/SingleProject.vue';
import NotFound from './pages/NotFound.vue';
import AppContactMe from './pages/AppContactMe.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHomepage
        },
        {
            path: '/suites',
            name: 'suites',
            component: AppSuites
        },
        {
            path: '/suites/:slug',
            name: 'AppSingleSuite',
            component: AppSingleSuite
        },
        {
            path: '/contacts/:slug',
            name: 'Contacts',
            component: AppContactMe
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
})

export { router };