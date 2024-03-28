import {createRouter, createWebHistory} from "vue-router"
import HomePage from "@/pages/HomePage";
import AddCampaignPage from "@/pages/AddCampaignPage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/addCampaign",
        name: "Campaign",
        component: AddCampaignPage,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;
