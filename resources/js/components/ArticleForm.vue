<template>
    <div class="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Créer un nouvel Article</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- General Error Message -->
          <div v-if="generalError" class="text-red-500">{{ generalError }}</div>
          
          <!-- Title Field -->
          <div>
            <label for="title" class="block text-gray-700 font-semibold">Titre:</label>
            <input v-model="form.title" type="text" id="title" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div v-if="errors.title" class="text-red-500">{{ errors.title[0] }}</div>
          </div>
          
          <!-- Category Field -->
          <div>
            <label for="category" class="block text-gray-700 font-semibold">Catégorie:</label>
            <select v-model="form.category" id="category" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="" selected>Sélectionner une catégorie</option>
              <option value="Technologie">Technologie</option>
              <option value="Science">Science</option>
              <option value="Politique">Politique</option>
              <!-- Add more options as needed -->
            </select>
          </div>
          
          <!-- Author Field -->
          <div>
            <label for="author" class="block text-gray-700 font-semibold">Auteur:</label>
            <input v-model="form.author" type="text" id="author" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div v-if="errors.author" class="text-red-500">{{ errors.author[0] }}</div>
          </div>
          
          <!-- Text Description Field -->
          <div>
            <label for="text" class="block text-gray-700 font-semibold">Description:</label>
            <textarea v-model="form.text" id="text" class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <div v-if="errors.text" class="text-red-500">{{ errors.text[0] }}</div>
          </div>
          
          <!-- Image Field -->
          <div class="my-4">
            <label for="image" class="block text-gray-700 font-semibold mb-2">Image:</label>
            <input type="file" id="image" @change="handleFileUpload" accept="image/*" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            <div v-if="errors.image" class="mt-2 text-red-500 text-sm">
              <div v-for="error in errors.image" :key="error">{{ error }}</div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Create
          </button>
        </form>
      </div>
    </div>
  </template>
  

<script>
import useArticleForm from '../composition-api/useArticleForm';

export default {
  setup() {
    const { form, errors, generalError, submitForm, handleFileUpload } = useArticleForm();
    return { form, errors, generalError, submitForm, handleFileUpload };
  }
};

</script>

<style>
/* Add any necessary styling here */
</style>
