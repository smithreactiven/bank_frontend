import {createRouter, createWebHistory} from "vue-router"
import HomePage from "@/pages/HomePage";
import AddCampaignPage from "@/pages/AddCampaignPage";
import CampaignPage from "@/pages/CampaignPage.vue";
import AdminModePage from "@/pages/AdminModePage.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/addCampaign",
        name: "addCampaign",
        component: AddCampaignPage,
    },
    {
        path: "/campaign",
        name: "Campaign",
        component: CampaignPage,
    },
    {
        path: "/adminMode",
        name: "AdminMode",
        component: AdminModePage,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;
