<template>
  <div>
    <br><br>
    <h2 class="text-gray-800 font-bold text-3xl mb-8 ml-4">Catégorie: {{ categoryName }}s</h2>
    <hr>
    <div  v-if="Object.keys(articles).length !== 0" class="grid grid-cols-1 gap-8 md:grid-cols-2 mt-12 xl:grid-cols-3">
      <div v-for="article in articles" :key="article.id" class="mb-8 ml-4">
        <img :src="'/storage/' + article.image" alt="Article Image" class="object-cover w-full h-96 rounded-lg">
           <div class="mt-8">
                <span class="text-sky-500 uppercase tracking-wider">{{ article.category }}</span>
                <h1 class="mt-4 text-xl font-semibold text-gray-800 truncate">
                {{ article.title }}
                </h1>
                <p class="mt-2 text-gray-500">
                {{ article.excerpt }}
                </p>
                <div class="flex items-center justify-between mt-4">
                <div>
                    <a :href="'/author/' + article.author_slug" class="text-lg font-medium text-gray-700 hover:underline
                     hover:text-gray-500">
                    {{ article.author_name }}
                    </a>
                    <p class="text-sm text-gray-500">{{ formatDate(article.created_at) }}</p>
                </div>
                    <a href="#" class="inline-block text-sky-500 underline hover:text-sky-400"
                     @click.prevent="readMore(article)">Lire plus</a>
                </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import useArticleForm from '../composition-api/useArticleForm';
import { useRoute, useRouter } from 'vue-router';


export default {
  setup() {
    const { articles, fetchCategoryArticles, categoryName } = useArticleForm();
    const route = useRoute();
    const router = useRouter();



    onMounted(() => {
      categoryName.value = route.params.category;
      fetchCategoryArticles();
      console.log(articles)
    });

    const readMore = (article) => {
      router.push({ name: 'SingleArticle', params: { articleId: article.id } });
    };

    const formatDate = (date) => {
      // Implement your date formatting logic here
      return new Date(date).toLocaleDateString();
    };

    return { articles, categoryName, readMore, formatDate };
  }
};
</script>
<style scoped>
/* Add any necessary styling here */
</style>
