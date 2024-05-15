import {createRouter, createWebHistory} from "vue-router"
import HomePage from "@/pages/HomePage";
import SpendingPage from "@/pages/SpendingPage.vue";
import BonusPage from "@/pages/BonusPage.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/spending",
        component: SpendingPage,
    },
    {
        path: "/bonus",
        component: BonusPage
    }
 ]


const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;
