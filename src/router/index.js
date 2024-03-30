import {createRouter, createWebHistory} from "vue-router"
import HomePage from "@/pages/HomePage";
import AddCampaignPage from "@/pages/AddCampaignPage.vue";
import AddRewardsPage from "@/pages/AddRewardsPage.vue";


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
    },
    {
        path: "/addRewards",
        component: AddRewardsPage,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;
