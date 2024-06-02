import {createRouter, createWebHistory} from "vue-router"
import HomePage from "@/pages/HomePage";
import SpendingPage from "@/pages/SpendingPage.vue";
import BonusPage from "@/pages/BonusPage.vue";
import TonPage from "@/pages/TonPage.vue";
import TransferPage from "@/pages/TransferPage.vue";


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
    },
    {
        path: "/ton",
        component: TonPage
    },
    {
        path: "/transfer",
        component: TransferPage
    }
 ]


const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;
