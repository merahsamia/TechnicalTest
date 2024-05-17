<template>
  <div  class="article" >
    <div v-if="Object.keys(article).length !== 0" class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12 mx-5">
        <div>
          <img :src="'/storage/' + article.image" alt="Article Image" class="object-cover w-full h-auto rounded-lg">
        </div>
        <div class="article-details">
          <span class="text-sky-500 uppercase tracking-wider">{{ article.category }}</span>
          <h1 class="mt-4 text-xl font-semibold text-gray-800">{{ article.title }}</h1>
          <p class="mt-2 text-gray-500">{{ article.author }}</p>
          <div class="flex items-center justify-between mt-4">
            <div>
              <a :href="'/author/' + article.author_slug" class="text-lg font-medium text-gray-700 hover:underline hover:text-gray-500">{{ article.author_name }}</a>
              <p class="text-sm text-gray-500">{{ formatDate(article.created_at) }}</p>
            </div>
          </div>
          <div class="text mt-4">
            {{ article.text }}
          </div>
          <br>
          <hr>
          <br>
          <!-- Edit and Delete Buttons -->
          <router-link :to="{ name: 'ArticleEdit', params: {id: article.id} }" 
                            class="mr-2 inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25">
                            Modifier
                        </router-link>

          <button @click="deleteArticle(article.id)" class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">Supprimer</button>
        </div>
    </div>

    <div v-else class=" w-full mt-20 mx-5  flex  justify-center">
      <br> 
      <h3 class="mt-2 text-gray-500">Article Not found</h3>
    </div>

  </div>
  
</template>



<script>
import useArticleForm from '../composition-api/useArticleForm';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const { article, fetchArticle, deleteArticle } = useArticleForm();
    const route = useRoute();
    const id = route.params.articleId;

    onMounted(() => {
      fetchArticle(id); // Passez l'ID à la fonction fetchArticle
    });
   
    
    const formatDate = (date) => {
      // Implement your date formatting logic here
      return new Date(date).toLocaleDateString();
    };

    return { article, formatDate, deleteArticle };
  }
};
</script>

<style scoped>
.article {
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  min-height: 500px;
}

.article-details {
  margin-top: 10px;
}
</style>
