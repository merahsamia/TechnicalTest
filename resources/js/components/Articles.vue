<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Articles</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-if="!loading && articles.length === 0" class="text-center">No articles found.</div>
    <div v-if="!loading && articles.length > 0">
      <div v-for="article in articles" :key="article.id" class="mb-4 p-4 border rounded">
        <h2 class="text-xl font-semibold">{{ article.title }}</h2>
        <p class="text-gray-700">{{ article.description }}</p>
        <p class="text-gray-500 text-sm">By {{ article.author }} on {{ new Date(article.created_at).toLocaleDateString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      loading: true,
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    fetchArticles() {
      fetch('/api/articles')
        .then(response => response.json())
        .then(data => {
          this.articles = data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching articles:', error);
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles for the component here */
</style>
