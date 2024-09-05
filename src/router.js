import { createRouter, createWebHistory } from 'vue-router';
import AppHomepage from './pages/AppHompage.vue';
import AppSuites from './pages/AppSuites.vue';
// import AppAbout from './pages/AppAbout.vue';
// import AppProjects from './pages/AppProjects.vue';
// import AppContacts from './pages/AppContacts.vue';
// import SingleProject from './pages/SingleProject.vue';
// import NotFound from './pages/NotFound.vue';

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
            name: 'sutes all',
            component: AppSuites
        },
        // {
        //     path: '/about',
        //     name: 'About Me',
        //     component: AppAbout
        // },
        // {
        //     path: '/contacts',
        //     name: 'Contacts',
        //     component: AppContacts
        // },
        // {
        //     path: '/projects',
        //     name: 'Projects',
        //     component: AppProjects
        // },
        // {
        //     path: '/projects/:slug',
        //     name: 'SingleProject',
        //     component: SingleProject
        // },
        // {
        //     path: '/:pathMatch(.*)*',
        //     name: 'not-found',
        //     component: NotFound
        // },
    ]
})

export { router };