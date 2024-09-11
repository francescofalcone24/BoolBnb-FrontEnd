import { createRouter, createWebHashHistory } from 'vue-router';
import AppHomepage from './pages/AppHompage.vue';
import AppSuites from './pages/AppSuites.vue';
import AppSingleSuite from './pages/AppSingleSuite.vue';
// import AppProjects from './pages/AppProjects.vue';
// import AppContacts from './pages/AppContacts.vue';
// import SingleProject from './pages/SingleProject.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHomepage
        },
        {
            path: '/suite/search',
            name: 'suites',
            component: AppSuites
        },
        {
            path: '/suite/:slug',
            name: 'AppSingleSuite',
            component: AppSingleSuite
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFound
        },
    ]
})

export { router };