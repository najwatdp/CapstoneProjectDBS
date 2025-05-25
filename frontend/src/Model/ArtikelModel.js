import axios from 'axios';

class ArticleModel {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  // Fetch artikel dari API
  async fetchArticles() {
    try {
      const response = await axios.get(`${this.baseURL}/artikel`);
      const data = response.data;

      // Handle berbagai struktur response
      if (Array.isArray(data)) {
        return data;
      } else if (Array.isArray(data.artikel)) {
        return data.artikel;
      } else if (Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error("Struktur data artikel tidak dikenali:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }

  // Fetch kategori dari API
  async fetchCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/kategori`);
      const data = response.data;

      // Handle berbagai struktur response
      if (Array.isArray(data)) {
        return data;
      } else if (Array.isArray(data.kategori)) {
        return data.kategori;
      } else if (Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error("Struktur data kategori tidak dikenali:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  // Filter artikel berdasarkan kategori
  filterArticlesByCategory(articles, categories, activeCategory) {
    if (activeCategory === "Semua") {
      return articles;
    }
    
    return articles.filter(article => {
      const category = categories.find(c => c.id === article.kategori_id);
      return category && category.nama_kategori === activeCategory;
    });
  }

  // Hitung jumlah artikel per kategori
  getCategoriesWithCount(categories, articles) {
    return categories.map(category => ({
      ...category,
      count: articles.filter(a => a.kategori_id === category.id).length,
    }));
  }

  // Buat daftar subkategori dengan opsi "Semua"
  createSubcategories(categories, articles) {
    const categoriesWithCount = this.getCategoriesWithCount(categories, articles);
    
    return [
      { id: 'semua', name: 'Semua', count: articles.length },
      ...categoriesWithCount.map(c => ({
        id: c.id,
        name: c.nama_kategori,
        count: c.count,
      })),
    ];
  }

  // Dapatkan nama kategori berdasarkan ID
  getCategoryName(categoryId, categories) {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.nama_kategori : 'Kategori Tidak Ditemukan';
  }

  // Format tanggal
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }

  // Truncate text
  truncateText(text, maxLength = 200) {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
}

export default ArticleModel;