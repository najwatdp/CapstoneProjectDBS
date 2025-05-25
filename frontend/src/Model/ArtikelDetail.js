import axios from 'axios';

export class ArticleModel {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async getArticleById(id) {
    try {
      const response = await axios.get(`${this.baseURL}/artikel/${id}`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getAllArticles() {
    try {
      const response = await axios.get(`${this.baseURL}/artikel`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getCategories() {
    try {
      const response = await axios.get(`${this.baseURL}/kategori`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async subscribeNewsletter(email) {
    try {
      const response = await axios.post(`${this.baseURL}/newsletter`, { email });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Utility methods untuk manipulasi data
  filterArticlesByCategory(articles, categoryId) {
    return articles.filter(article => 
      String(article.kategori_id) === String(categoryId)
    );
  }

  getRandomArticles(articles, excludeId, excludeCategoryId, count = 3) {
    return articles
      .filter(a => a.kategori_id !== excludeCategoryId && a.id !== excludeId)
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  getPopularArticles(articles, excludeId, count = 3) {
    return articles
      .filter(a => a.id !== excludeId)
      .sort((a, b) => b.id - a.id)
      .slice(0, count);
  }

  addCountToCategories(categories, articles) {
    return categories.map(kategori => {
      const count = articles.filter(
        a => String(a.kategori_id) === String(kategori.id)
      ).length;
      return { ...kategori, count };
    });
  }

  getCategoryName(categories, categoryId) {
    if (!categories || categories.length === 0) return 'Memuat kategori...';
    const kategori = categories.find(k => String(k.id) === String(categoryId));
    return kategori ? kategori.nama_kategori : 'Kategori tidak ditemukan';
  }
}