import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "../components/login/Login";
import Signup from "../components/login/Signup";
import Forum from "../components/forum/Forum";
import Logout from "../components/login/Logout";
import Read from "../components/forum/Read";
import CreateQuestion from "../components/forum/CreateQuestion";
import CreateCategory from "../components/category/CreateCategory";
import Parallex from "../components/Parallex";

Vue.use(VueRouter);

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/forum', component: Forum, name: 'forum' },
    { path: '/question/:slug', component: Read , name: 'read' },
    { path: '/ask', component: CreateQuestion },
    { path: '/logout', component: Logout },
    { path: '/category', component: CreateCategory },
    { path: '/', component: Parallex}
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes, // short for `routes: routes`
    hashbang: false,
    mode: 'history'
});

export default  router;
