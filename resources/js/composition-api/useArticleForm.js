import { ref ,getCurrentInstance} from "vue";

export default function useArticleForm() {

    const router = getCurrentInstance().proxy.$router;

    const form = ref({
        title: "",
        category: "",
        author: "",
        text: "",
        image: null,
    });

    const errors = ref({});
    const generalError = ref(null);

    const  categories  = ref([]);

    const article = ref({});
    const id = ref('');

    const articles = ref([]);

    const categoryName = ref("");

    const fetchCategoryArticles = async () => { 
        try {
        const response = await fetch(`/api/articles-by-category/${categoryName.value}`);
        if (!response.ok) {
            throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        //console.log(data)
        articles.value = data;
        } catch (error) {
        console.error('Error fetching articles:', error);
        }
    };

   
    //Home
    const getArticlesByCategory = async () => {
        try {
            const response = await fetch('/api/articles-by-category'); 
            if (!response.ok) {
                throw new Error('Failed to fetch articles by category');
            }
            const data = await response.json();
            console.log(data)

            categories.value = data;
        } catch (error) {
            console.error('Error fetching articles by category:', error);
        }
    };

    //Article.vue
    const fetchArticle = async (id) => { 
        try {
          const response = await fetch(`/api/article/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch Article');
          }
          const data = await response.json();
          console.log(data);
      
          article.value = data;
        } catch (error) {
          console.error('Error fetching Article:', error);
        }
      };

    //Article.vue
    const deleteArticle = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/articles/${id}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        throw new Error("Failed to delete article");
                    }

                    article.value = {};
                    window.Toast.fire({
                        icon: "success",
                        title: "Article deleted successfully!"
                    });
                } catch (error) {
                    console.error("Error deleting article:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to delete article. Please try again.",
                    });
                }
            }
        });

      };

    //ArticleForm.vue

    const submitForm = async () => {
        const formData = new FormData();
        formData.append("title", form.value.title);
        formData.append("category", form.value.category);
        formData.append("author", form.value.author);
        formData.append("text", form.value.text);
        formData.append("image", form.value.image);

        try {
            const response = await fetch("/api/articles", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    errors.value = data.errors; // Set validation errors
                } else {
                    generalError.value =
                        "Failed to create article. Please try again."; // Set general error message
                }
            } else {
                console.log("Article created:", data);

                
                router.push({ name: 'SingleArticle', params: { articleId: data.id } });
               
              
            }
        } catch (error) {
            console.error("Error creating article:", error);
            generalError.value = "Failed to create article. Please try again."; // Set general error message
        }
    };

    
    const getArticle = async (id) => {
        let response = await axios.get(`/api/article/` +id)
        article.value = response.data.data
    }

    const submitEditForm = async (id) => {
        errors.value = ''
        try{
            await axios.put(`/api/articles/` + id, article.value)
            await router.push({ name: 'SingleArticle', params: { articleId: data.id } });

        } catch(e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }
    }

    //ArticleForm.vue
    const handleFileUpload = (event) => {
        form.value.image = event.target.files[0];
    };


    return { form, errors, generalError, submitForm, handleFileUpload, submitEditForm ,
         getArticle, categories, getArticlesByCategory, fetchArticle, id, article, 
         deleteArticle, fetchCategoryArticles, articles, categoryName};
}
