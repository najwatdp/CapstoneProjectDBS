import { ArticleModel } from '../Model/ArtikelDetail';

export class ArticlePresenter {
  constructor({ view }) {
    this.model = new ArticleModel();
    this.view = view;
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

  async handleLike(user_id, artikel_id, status) {
    try {
      const res = await this.model.createLike(user_id, artikel_id, status);
      console.log(res);
      await this.getLike(user_id, artikel_id);
    } catch (err) {
      console.error("Terjadi Error:", err);
    }
  }

  async getUser(artikel_id) {
    try {
      const user = await this.model.getUser();
      this.view.setUser(user.user);
      await this.getLike(user.user.userID, artikel_id);
      console.log(user.user);
    } catch (err) {
      console.log("user belum login");
    }
  }

  async getLike(user_id, artikel_id) {
    if (!user_id) return;
    try {
      const res = await this.model.getlike(user_id, artikel_id);
      console.log(res);
      if (res.status === "success") {
        if (res.data.status === "like") {
          this.view.updateLikeStatus("like");
        }
        else {
          this.view.updateLikeStatus("dislike");
        }
      }
    } catch (err) {
      console.error(err);
    }
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