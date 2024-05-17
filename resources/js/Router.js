import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Articles from "./components/Articles.vue";
import Article from "./components/Article.vue";
import ArticleForm from "./components/ArticleForm.vue";
import CategoryArticles from "./components/CategoryArticles.vue";
import ArticleEditForm from "./components/ArticleEditForm.vue";

const routes = [

    { 
        path: "/", 
        component: Home,
        name: "Home"
    },


    { 
        path: "/articles", 
        component: Articles,
        name: "Articles"
    },


    {
        path: "/category/:category",
        name: "Category",
        component: CategoryArticles,
    },

    {
        path: "/articles/create",
        name: "ArticleForm",
        component: ArticleForm,
    },


    {
        path: "/article/:articleId",
        name: "SingleArticle",
        component: Article,
    },
    

    { 
        path: '/articles/:id/edit',
        name: 'ArticleEdit',
        component: ArticleEditForm,
        props: true
    }, 

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
