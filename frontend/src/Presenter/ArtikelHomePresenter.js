import { useState, useEffect } from 'react';
import ArticleModel from '../Model/ArtikelModel';

class ArticlePresenter {
  constructor() {
    this.model = new ArticleModel();
  }

  // Hook untuk mengelola state dan logic
  useArticleLogic() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSubcategory, setActiveSubcategory] = useState("Semua");
    const [error, setError] = useState(null);

    // Fetch data saat component mount
    useEffect(() => {
      this.loadData(setArticles, setCategories, setLoading, setError);
    }, []);

    // Computed values
    const filteredArticles = this.model.filterArticlesByCategory(
      articles, 
      categories, 
      activeSubcategory
    );

    const subcategories = this.model.createSubcategories(categories, articles);

    return {
      // State
      articles,
      categories,
      loading,
      activeSubcategory,
      error,
      
      // Computed
      filteredArticles,
      subcategories,
      
      // Actions
      setActiveSubcategory,
      
      // Utility functions
      getCategoryName: (categoryId) => this.model.getCategoryName(categoryId, categories),
      formatDate: this.model.formatDate,
      truncateText: this.model.truncateText,
      
      // Handlers
      handleSubcategoryChange: (subcategory) => {
        setActiveSubcategory(subcategory);
      },
      
      handleRefresh: () => {
        this.loadData(setArticles, setCategories, setLoading, setError);
      }
    };
  }

  // Load data dari model
  async loadData(setArticles, setCategories, setLoading, setError) {
    try {
      setLoading(true);
      setError(null);

      // Fetch data secara paralel
      const [articlesData, categoriesData] = await Promise.all([
        this.model.fetchArticles(),
        this.model.fetchCategories()
      ]);

      setArticles(articlesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error loading data:", error);
      setError(error.message || 'Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  }

  // Business logic methods
  getArticlesBySection(articles, section) {
    switch (section) {
      case 'featured':
        return articles.slice(0, 2);
      case 'sidebar':
        return articles.slice(3);
      case 'main':
        return articles.slice(1);
      default:
        return articles;
    }
  }

  // Validation methods
  validateArticle(article) {
    return article && article.id && article.judul && article.isi;
  }

  validateCategory(category) {
    return category && category.id && category.nama_kategori;
  }

  // Search functionality
  searchArticles(articles, searchTerm) {
    if (!searchTerm) return articles;
    
    const term = searchTerm.toLowerCase();
    return articles.filter(article => 
      article.judul.toLowerCase().includes(term) ||
      article.isi.toLowerCase().includes(term)
    );
  }

  // Sorting functionality
  sortArticles(articles, sortBy = 'date') {
    switch (sortBy) {
      case 'date':
        return [...articles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'title':
        return [...articles].sort((a, b) => a.judul.localeCompare(b.judul));
      case 'author':
        return [...articles].sort((a, b) => a.author.localeCompare(b.author));
      default:
        return articles;
    }
  }

  // Navigation helpers
  getArticleUrl(articleId) {
    return `/artikel/${articleId}`;
  }

  getCategoryUrl(categoryId) {
    return `/kategori/${categoryId}`;
  }

  // Constants for view
  getTrendingTags() {
    return ['Sehat', 'Gizi', 'Kehamilan', 'Mental', 'Covid'];
  }

  getHealthTools() {
    return [
      { title: 'Kalkulator BMI' },
      { title: 'Tes Risiko Diabetes' },
      { title: 'Kalori Harian' },
      { title: 'Usia Kehamilan' }
    ];
  }

  getSocialMediaLinks() {
    return [
      { platform: 'facebook', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'whatsapp', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'email', url: '#' }
    ];
  }

  getFooterLinks() {
    return {
      categories: [
        { name: 'Jantung', url: '#' },
        { name: 'Diabetes', url: '#' },
        { name: 'Kesehatan Mental', url: '#' },
        { name: 'COVID-19', url: '#' },
        { name: 'Kehamilan', url: '#' }
      ],
      services: [
        { name: 'Konsultasi Online', url: '#' },
        { name: 'Cek Kesehatan', url: '#' },
        { name: 'Direktori Dokter', url: '#' },
        { name: 'Kalkulator Kesehatan', url: '#' }
      ]
    };
  }
}

// Export singleton instance
const articlePresenter = new ArticlePresenter();
export { articlePresenter };