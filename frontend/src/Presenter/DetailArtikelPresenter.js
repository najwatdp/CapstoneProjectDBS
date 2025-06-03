import { ArticleModel } from '../Model/ArtikelDetail';

export class ArticlePresenter {
  constructor() {
    this.model = new ArticleModel();
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  async loadArticleData(articleId) {
    this.view.setLoading(true);
    
    try {
      const [artikelResult, kategoriResult, semuaArtikelResult] = await Promise.all([
        this.model.getArticleById(articleId),
        this.model.getCategories(),
        this.model.getAllArticles()
      ]);

      if (!artikelResult.success) {
        this.view.showError('Gagal memuat artikel');
        return;
      }
      if (!kategoriResult.success) {
        this.view.showError('Gagal memuat kategori');
        return;
      }
      if (!semuaArtikelResult.success) {
        this.view.showError('Gagal memuat daftar artikel');
        return;
      }

      const artikel = artikelResult.data;
      const kategoris = Array.isArray(kategoriResult.data) ? kategoriResult.data : [];
      const semuaArtikel = semuaArtikelResult.data;
      const kategoriWithCount = this.model.addCountToCategories(kategoris, semuaArtikel);
      const randomArticles = this.model.getRandomArticles(semuaArtikel, artikel.id, artikel.kategori_id);
      const popularArticles = this.model.getPopularArticles(semuaArtikel, artikel.id);

      this.view.setArticleData(artikel);
      this.view.setCategories(kategoriWithCount);
      this.view.setRelatedArticles(randomArticles);
      this.view.setPopularArticles(popularArticles);
      
    } catch (error) {
      console.error('Error in presenter:', error);
      this.view.showError('Terjadi kesalahan saat memuat data');
    } finally {
      this.view.setLoading(false);
    }
  }

  handleLike(currentStatus, newStatus, artikel) {
    let newLikeStatus = currentStatus === newStatus ? null : newStatus;
    let newLikes = artikel.likes;
    let newDislikes = artikel.dislikes;
    if (currentStatus === 'like') newLikes--;
    if (currentStatus === 'dislike') newDislikes--;
    if (newLikeStatus === 'like') newLikes++;
    if (newLikeStatus === 'dislike') newDislikes++;
    this.view.updateLikeStatus(newLikeStatus, newLikes, newDislikes);
  }

  handleBookmark(currentStatus) {
    const newStatus = !currentStatus;
    this.view.updateBookmarkStatus(newStatus);
  }

  async handleShare() {
    try {
      const articleUrl = window.location.href;
      await navigator.clipboard.writeText(articleUrl);
      this.view.showShareSuccess();
    } catch (error) {
      this.view.showShareError();
    }
  }

  handlePrint() {
    window.print();
  }

  async handleNewsletterSubmit(email) {
    if (!email || !email.trim()) {
      this.view.showNewsletterError('Email tidak boleh kosong');
      return;
    }

    try {
      const result = await this.model.subscribeNewsletter(email.trim());
      
      if (result.success) {
        this.view.showNewsletterSuccess('Berhasil berlangganan!');
        this.view.clearNewsletterEmail();
      } else {
        this.view.showNewsletterError('Gagal berlangganan. Coba lagi!');
      }
    } catch (error) {
      this.view.showNewsletterError('Terjadi kesalahan saat berlangganan');
    }
  }

  getCategoryName(categories, categoryId) {
    return this.model.getCategoryName(categories, categoryId);
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
  }
}