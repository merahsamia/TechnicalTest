<template>
  <div>
    <br><br>
    <h2 class="text-gray-800 font-bold text-3xl mb-8 ml-4">Catégorie: {{ categoryName }}</h2>
    <hr>
    <div  v-if="Object.keys(articles).length !== 0" class="grid grid-cols-1 gap-8 md:grid-cols-2 mt-12 xl:grid-cols-3">
      <div v-for="article in articles.data" :key="article.id" class="mb-8 ml-4">
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
                    <p class="text-sm text-gray-500">{{ article.publish_date }}</p>
                </div>
                    <a href="#" class="inline-block text-sky-500 underline hover:text-sky-400"
                     @click.prevent="readMore(article)">Lire plus</a>
                </div>
          </div>
      </div>
    </div>

    <div class="flex justify-center mt-8">
      
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px text-sm">
            <li :class="{
                          'flex': true,
                          'items-center': true,
                          'justify-center': true,
                          'px-3': true,
                          'h-8': true,
                          'leading-tight': true,
                          'text-gray-500': true,
                          'bg-white': true,
                          'border': true,
                          'border-gray-300': true,
                          'hover:bg-gray-100': true,
                          'hover:text-gray-700': true,
                          'dark:bg-gray-800': true,
                          'dark:border-gray-700': true,
                          'dark:text-gray-400': true,
                          'dark:hover:bg-gray-700': true,
                          'dark:hover:text-white': true,
                          'bg-blue-500': link.active,
                          'text-white': link.active,
                          'dark:bg-blue-600': link.active,
                          'dark:text-white': link.active,
                          'disabled': !link.url
                        }"  
             v-for="(link , index) in articlesLinks" :key="index"> 
             <a href="#" v-html="link.label" @click.prevent="getResults(link)"></a> 
            </li>
           
          
          </ul>
        </nav>

    </div>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import useArticleForm from '../composition-api/useArticleForm';
import { useRoute, useRouter } from 'vue-router';


export default {
  setup() {
    const { articles, fetchCategoryArticles, categoryName, articlesLinks } = useArticleForm();
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

    const getResults = async (link) => {
          if (!link.url || link.active) {
              return;
          } else {
              try {
                  const response = await fetch(link.url);
                  if (!response.ok) {
                      throw new Error('Failed to fetch articles');
                  }
                  const data = await response.json();
                  console.log(data);
                  articles.value = data;
                  articlesLinks.value = data.links;
                  console.log(articlesLinks.value);
              } catch (error) {
                  console.error('Error fetching articles:', error);
              }
          }
      };


    return { articles, categoryName, readMore, articlesLinks, getResults };
  }
};
</script>
<style scoped>
/* Add any necessary styling here */
</style>
