import { createRouter, createWebHashHistory } from "vue-router";

import App from "../App.vue";
import Votes from "~/pages/Votes.vue";
import VoteResults from "~/pages/VoteResults.vue";

const routes = [
  {
    path: "/",
    name: "app",

    // component: App,

    redirect: { name: "vote" },

    children: [
      {
        path: "vote",
        name: "vote",
        component: Votes,
      },
      {
        path: "results",
        name: "results",
        component: VoteResults,
      },
    ],
  },
];

const router = createRouter({
  // 4. Provide the history implementation to use. We
  // are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
