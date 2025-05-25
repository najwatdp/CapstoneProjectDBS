// models/homeModel.js
import axios from "axios";

export class HomeModel {
  constructor() {
    this.baseURL = "http://localhost:5000/api";
  }

  // Mengambil data artikel
  async fetchArtikel() {
    try {
      const response = await axios.get(`${this.baseURL}/artikel`);
      const data = response.data;

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
      console.error("Gagal fetch artikel:", error);
      throw error;
    }
  }

  // Mengambil data kategori kesehatan
  async fetchKategoriKesehatan() {
    try {
      const response = await axios.get(`${this.baseURL}/kategori`);
      const data = response.data;

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
      console.error("Gagal fetch kategori kesehatan:", error);
      throw error;
    }
  }

  // Utility functions untuk data processing
  shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  sortArticlesByDate(articles) {
    return [...articles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  calculateArtikelCountPerKategori(artikel, kategoriKesehatan) {
    return kategoriKesehatan.map((kategori) => {
      const count = artikel.filter((art) => art.kategori_id === kategori.id).length;
      return { ...kategori, count };
    });
  }

  getTop3Kategori(artikelCountPerKategori) {
    return artikelCountPerKategori
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }

  getNamaKategori(kategoriId, kategoriKesehatan) {
    const kategori = kategoriKesehatan.find(k => k.id === kategoriId);
    return kategori ? kategori.nama_kategori : 'Kategori Tidak Ditemukan';
  }

  // Check user role from storage (Note: In real MVP, this would be in a separate auth model)
  getUserRole() {
    // In a real application, avoid localStorage in artifacts
    // This is just for demonstration - use state management instead
    return "user"; // Simplified for artifact compatibility
  }
}