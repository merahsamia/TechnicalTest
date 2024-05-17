import { ref } from "vue";

export default function useArticleEditComposition(route) {
   const id = route.params.id;
   const article = ref({
       title: "",
       category: "",
       author: "",
       text: "",
       image: null,
   });
   const oldImage = ref("");
   const errors = ref({});
   const generalError = ref("");

   const handleFileUpload = (event) => {
       article.value.image = event.target.files[0];
   };

   const fetchArticle = async () => {
       try {
           const response = await fetch(`/api/articles/${id}`);
           const data = await response.json();
           article.value.title = data.title;
           article.value.category = data.category;
           article.value.author = data.author;
           article.value.text = data.text;
           oldImage.value = data.image;
       } catch (error) {
           generalError.value =
               "An error occurred while fetching the article data.";
       }
   };

   const saveArticle = async () => {
       errors.value = {};
       generalError.value = "";

       try {
           const formData = new FormData();
           formData.append("_method", "PUT");
           formData.append("title", article.value.title);
           formData.append("category", article.value.category);
           formData.append("author", article.value.author);
           formData.append("text", article.value.text);
           if (article.value.image) {
               formData.append("image", article.value.image);
           }

           const response = await fetch(`/api/articles/${id}`, {
               method: "POST",
               body: formData,
           });

           const responseData = await response.json();

           if (!response.ok) {
               throw responseData;
           } else {
               oldImage.value = responseData.image;
           }

           console.log(article.value.category)
           window.Toast.fire({
            icon: "success",
            title: "Article modifié avec succès"
            });
           } catch (error) {
           if (error.errors) {
               errors.value = error.errors;
               generalError.value =
                   error.message ||
                   "An error occurred while saving the article.";
           } else {
               generalError.value =
                   "An error occurred while saving the article.";
           }
       }
   };

   fetchArticle();

   return {
       id,
       article,
       oldImage,
       errors,
       generalError,
       handleFileUpload,
       saveArticle,
   };
}

