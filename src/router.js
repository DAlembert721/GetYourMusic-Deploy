import Vue from 'vue'
import Router from 'vue-router'

//import Home from "@/components/Home";
import Contracts from "@/components/contracts/Contracts";
import Messages from "@/components/Messages";
import Notifications from "@/components/Notifications";
import Profile from "@/components/Profile";
import Search from "@/components/organizer/Search";
import GeneralForms from "@/components/forms/GeneralForms";
import App from "@/App";
import Main from "@/components/Main";
import VisitorMusician from "./components/visitor/VisitorMusician";

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        { path: '/', name: 'root', redirect: 'login', component: App },
        { path: '/login', name: 'login', component: GeneralForms },
        { path: '/home', name: 'home', component: Main },
        { path: '/contracts', name: 'contracts', component: Contracts },
        { path: '/messages', name: 'messages', component: Messages },
        { path: '/notifications', name: 'notifications', component: Notifications },
        { path: '/profile', name: 'profile', component: Profile },
        { path: '/search', name: 'search', component: Search },
        { path: '/visitor/:id', name: 'visitor', component: VisitorMusician }
    ]
})