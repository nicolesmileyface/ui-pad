// https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
import { createWebHistory, createRouter } from "vue-router";
import Editor from "../pages/editor.vue";
import Preview from "../pages/preview.vue";
import NotFound from "../pages/404.vue";

const routes = [
  {
    path: "/",
    redirect: "/editor"
  },
  {
    path: "/editor",
    name: "Editor",
    component: Editor,
  },
  {
    path: "/preview",
    name: "Preview",
    component: Preview,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;