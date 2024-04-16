import {createRouter, createWebHistory} from "vue-router"
import HomePage from "@/pages/HomePage";
import AddCampaignPage from "@/pages/AddCampaignPage";
import CampaignPage from "@/pages/CampaignPage.vue";
import AdminModePage from "@/pages/AdminModePage.vue";
import AddRewardPage from "@/pages/AddRewardPage.vue";
import TaskTemplatePage from "@/pages/TaskTemplatePage.vue";
import AddGroupTaskPage from "@/pages/AddGroupTaskPage.vue";
import AddTaskPage from "@/pages/AddTaskPage.vue";
import ListEditCampaignPage from "@/pages/ListEditCampaignPage.vue";
import EditCampaignPage from "@/pages/EditCampaignPage.vue";
import DoneCampaignPage from "@/pages/DoneCampaignPage.vue";
import ListDoneCampaignPage from "@/pages/ListDoneCampaignPage.vue";
import DoneCampaignUsersPage from "@/pages/DoneCampaignUsersPage.vue";
import StoryPage from "@/pages/StoryPage.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
    {
        path: "/addCampaign",
        name: "AddCampaign",
        component: AddCampaignPage,
    },
    {
        path: "/campaign",
        name: "Campaign",
        component: CampaignPage,
    },
    {
        path: "/doneCampaign",
        name: "DoneCampaign",
        component: DoneCampaignPage,
    },
    {
        path: "/adminMode",
        name: "AdminMode",
        component: AdminModePage,
    },
    {
        path: "/addReward",
        name: "AddReward",
        component: AddRewardPage,
    },
    {
        path: "/addGroupTask",
        name: "AddGroupTask",
        component: AddGroupTaskPage,
    },
    {
        path: "/taskTemplate",
        name: "TaskTemplate",
        component: TaskTemplatePage,
    },
    {
        path: "/addTask",
        name: "AddTask",
        component: AddTaskPage,
    },
    {
        path: "/listEditCampaign",
        name: "ListEditCampaign",
        component: ListEditCampaignPage,
    },
    {
        path: "/editCampaign",
        name: "EditCampaign",
        component: EditCampaignPage,
    },
    {
        path: "/listDoneCampaign",
        name: "ListDoneCampaign",
        component: ListDoneCampaignPage,
    },
    {
        path: "/doneCampaignUsers",
        name: "DoneCampaignUsers",
        component: DoneCampaignUsersPage,
    },
    {
        path: "/story",
        name: "Story",
        component: StoryPage,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;
