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
      // Fetch semua data yang diperlukan secara paralel
      const [artikelResult, kategoriResult, semuaArtikelResult] = await Promise.all([
        this.model.getArticleById(articleId),
        this.model.getCategories(),
        this.model.getAllArticles()
      ]);

      // Handle hasil fetch artikel
      if (!artikelResult.success) {
        this.view.showError('Gagal memuat artikel');
        return;
      }

      // Handle hasil fetch kategori
      if (!kategoriResult.success) {
        this.view.showError('Gagal memuat kategori');
        return;
      }

      // Handle hasil fetch semua artikel
      if (!semuaArtikelResult.success) {
        this.view.showError('Gagal memuat daftar artikel');
        return;
      }

      const artikel = artikelResult.data;
      const kategoris = Array.isArray(kategoriResult.data) ? kategoriResult.data : [];
      const semuaArtikel = semuaArtikelResult.data;

      // Proses data untuk view
      const kategoriWithCount = this.model.addCountToCategories(kategoris, semuaArtikel);
      const randomArticles = this.model.getRandomArticles(semuaArtikel, artikel.id, artikel.kategori_id);
      const popularArticles = this.model.getPopularArticles(semuaArtikel, artikel.id);

      // Update view dengan data yang sudah diproses
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
    // Update status like
    let newLikeStatus = currentStatus === newStatus ? null : newStatus;
    
    // Hitung likes/dislikes baru
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