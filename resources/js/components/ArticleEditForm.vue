<template>
  <div class="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
    <div class="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Modifier l'article</h2>
      <form @submit.prevent="saveArticle" class="space-y-4">
        <!-- General Error Message -->
        <div v-if="generalError" class="text-red-500">{{ generalError }}</div>
        
        <!-- Title Field -->
        <div>
          <label for="title" class="block text-gray-700 font-semibold">Titre:</label>
          <input v-model="article.title" type="text" id="title" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div v-if="errors.title" class="text-red-500">{{ errors.title[0] }}</div>
        </div>
        
        <!-- Category Field -->
        <div>
          <label for="category" class="block text-gray-700 font-semibold">Catégorie:</label>
          <select v-model="article.category" id="category" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Sélectionner une catégorie</option>
            <option value="Technologie">Technologie</option>
            <option value="Science">Science</option>
            <option value="Politique">Politique</option>
          </select>
          <div v-if="errors.category" class="text-red-500">{{ errors.category[0] }}</div>
        </div>
        
        <!-- Author Field -->
        <div>
          <label for="author" class="block text-gray-700 font-semibold">Auteur:</label>
          <input v-model="article.author" type="text" id="author" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div v-if="errors.author" class="text-red-500">{{ errors.author[0] }}</div>
        </div>
        
        <!-- Text Description Field -->
        <div>
          <label for="text" class="block text-gray-700 font-semibold">Description:</label>
          <textarea v-model="article.text" id="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <div v-if="errors.text" class="text-red-500">{{ errors.text[0] }}</div>
        </div>
        
        <!-- Image Field -->
        <div>
          <label for="image" class="block text-gray-700 font-semibold">Image:</label>
          <input type="file" id="image" @change="handleFileUpload" accept="image/*" class="block w-full text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <div v-if="errors.image" class="text-red-500">
            <div v-for="error in errors.image" :key="error">{{ error }}</div>
          </div>
          <br>
          <div class="old-image w-1/2 h-46">
            <img :src="'/storage/' + oldImage" alt="Image de l'article" class="w-full h-auto rounded-md">
          </div>
        </div>
        
        <!-- Submit Button -->
        <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Sauvegarder
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import { useRoute } from 'vue-router';
  import useArticleEdit from '../composition-api/useArticleEdit';

  
  export default {
  setup() {
    const route = useRoute();
    const { id, article, oldImage, errors, generalError, handleFileUpload, saveArticle } = useArticleEdit(route);

    return {id, article, oldImage, errors, generalError, handleFileUpload, saveArticle};

  }
};
  </script>

  