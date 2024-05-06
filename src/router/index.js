import {createRouter, createWebHistory} from "vue-router"
import HomePage from "@/pages/HomePage";


const routes = [
    {
        path: "/",
        name: "Home",
        component: HomePage,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
    })

export default router;
