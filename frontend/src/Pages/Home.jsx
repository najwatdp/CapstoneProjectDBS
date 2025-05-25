import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Carousel,
  Row,
  Col,
  Form,
  InputGroup,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import {
  FaSearch,
  FaHeartbeat,
  FaStethoscope,
  FaPhoneAlt,
  FaComments,
  FaArrowRight,
  FaUserMd,
} from "react-icons/fa";
import axios from "axios";

export default function Home() {
  const role = localStorage.getItem("role") !== "admin";

  return role ? <ContainerHome /> : <Navigate to="/dashboard" />;
}

function ContainerHome() {
  const [artikel, setArtikel] = useState([]);
  const [kategoriKesehatan, setKategoriKesehatan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mengambil semua data
  const fetchData = async () => {
    try {
      await Promise.all([getArtikel(), getKategoriKesehatan()]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Fungsi untuk mengambil data artikel
  const getArtikel = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/artikel");
      const data = response.data;

      if (Array.isArray(data)) {
      setArtikel(data);
    } else if (Array.isArray(data.artikel)) {
      setArtikel(data.artikel);
    } else if (Array.isArray(data.data)) {
      setArtikel(data.data);
    } else {
      console.error("Struktur data artikel tidak dikenali:", data);
      setArtikel([]);
    }
    } catch (err) {
      console.error("Gagal fetch artikel:", err);
      setArtikel([]);
    }
  };

  // Fungsi untuk mengambil data kategori kesehatan
  const getKategoriKesehatan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/kategori");
      const data = response.data;

      if (Array.isArray(data)) {
        setKategoriKesehatan(data);
      } else if (Array.isArray(data.kategori)) {
        setKategoriKesehatan(data.kategori);
      } else if (Array.isArray(data.data)) {
        setKategoriKesehatan(data.data);
      } else {
        console.error("Struktur data kategori tidak dikenali:", data);
        setKategoriKesehatan([]);
      }
    } catch (err) {
      console.error("Gagal fetch kategori kesehatan:", err);
      setKategoriKesehatan([]);
    }
  };
  // Fungsi untuk mengacak artikel
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fungsi untuk mengurutkan artikel berdasarkan tanggal
  const sortArticlesByDate = (articles) => {
    return articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  };

  // Hitung jumlah artikel per kategori
  const artikelCountPerKategori = kategoriKesehatan.map((kategori) => {
    const count = artikel.filter((art) => art.kategori_id === kategori.id).length;
    return { ...kategori, count };
  });

  // Urutkan berdasarkan jumlah artikel terbanyak dan ambil 3 teratas
  const top3Kategori = artikelCountPerKategori
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  // Mengacak artikel
  const shuffledArticles = shuffleArray(artikel);
  // Mengurutkan artikel berdasarkan tanggal
  const sortedArticles = sortArticlesByDate(artikel);

  // Fungsi untuk mendapatkan nama kategori berdasarkan ID
  const getNamaKategori = (kategoriId) => {
    const kategori = kategoriKesehatan.find(k => k.id === kategoriId);
    return kategori ? kategori.nama_kategori : 'Kategori Tidak Ditemukan';
  };

  // Fungsi untuk menghitung jumlah artikel per kategori
  // const hitungArtikelPerKategori = (kategoriId) => {
  //   return artikel.filter(art => art.kategori_id === kategoriId).length;
  // };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm sticky-top">
        <Container>
          <Navbar.Brand href="/home" className="text-primary">
            <img
              width="100"
              height="auto"
              src="/image/LogoHealth.png"
              alt="LogoKesehatanKu"
            />
            <span>
              <img
                width="100"
                height="auto"
                src="/image/kementrian-sehat.webp"
                alt="LogoKementrian"
              />
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Navbar.Toggle aria-controls="navbar-dark-example" />
              <Navbar.Collapse id="navbar-dark-example">
                <Nav>
                  <NavDropdown id="nav-dropdown-dark-example" title="Kategori Kesehatan" menuVariant="light" className="no-hover">
                    {kategoriKesehatan.length > 0 ? (
                    kategoriKesehatan.map((kategori) => (
                    <Dropdown.Item key={kategori.id} href={`/kategori/${kategori.id}`} className="d-flex align-items-center">
                        <img 
                          src={kategori.images || 'default-image.png'} 
                          alt={kategori.nama_kategori} 
                          style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%', marginRight: 10 }} 
                        />
                        {kategori.nama_kategori}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>Tidak ada kategori</Dropdown.Item>
                  )}
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <Nav.Link href="#" className="mx-2 d-flex align-items-center">
                <FaStethoscope className="me-1" />
                <span>Cek Kesehatan</span>
              </Nav.Link>
              <Nav.Link
                href="/kontak"
                className="mx-2 d-flex align-items-center"
              >
                <FaPhoneAlt className="me-1" />
                <span>Kontak</span>
              </Nav.Link>
              <Nav.Link href="#" className="mx-2 d-flex align-items-center">
                <FaComments className="me-1" />
                <span>Konsultasi Kesehatan</span>
              </Nav.Link>
            </Nav>
            <Form className="d-flex me-2">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Cari informasi kesehatan..."
                  aria-label="Search"
                />
                <Button className="">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
            <Button
              variant="light"
              href="/login"
              className="border-grey text-grey"
            >
              Masuk
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Carousel */}
      <Carousel className="hero-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/slide/2.png"
            alt="First slide"
          />
          <Carousel.Caption className="text-start bg-dark bg-opacity-50 rounded p-3">
            <h3>Informasi Kesehatan Terpercaya</h3>
            <p>
              Temukan artikel kesehatan terverifikasi oleh tim medis profesional
            </p>
            <Button variant="primary">Jelajahi Sekarang</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/slide/3.png"
            alt="Second slide"
          />
          <Carousel.Caption className="text-start bg-dark bg-opacity-50 rounded p-3">
            <h3>Konsultasi dengan Dokter</h3>
            <p>Layanan konsultasi online dengan dokter spesialis terpercaya</p>
            <Button variant="primary">Konsultasi Sekarang</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/public/image/slide/1.png"
            alt="Third slide"
          />
          <Carousel.Caption className="text-start bg-dark bg-opacity-50 rounded p-3">
            <h3>Cek Kesehatan Online</h3>
            <p>Evaluasi kondisi kesehatan Anda secara cepat dan akurat</p>
            <Button variant="primary">Cek Sekarang</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Trending Topics Section */}
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Topik Kesehatan Trending</h2>
          <Button
            variant="link"
            href="/artikel"
            className="text-decoration-none d-flex align-items-center"
          >
            Lihat Semua <FaArrowRight className="ms-2" />
          </Button>
        </div>
        <Row>
          <Col md={9}>
            <Row>
              {shuffledArticles.slice(0, 3).map((artikel) => (
                <Col md={4} className="mb-2" key={artikel.id}>
                  <a href={`/artikel/${artikel.id}`}>
                  <Card className="h-100 border-0 shadow-none">
                    <Card.Img variant="top" src={artikel.images || 'default-image.png'} />
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-gradient">
                          {getNamaKategori(artikel.kategori_id)}
                        </span>
                        <small className="text-muted">{new Date(artikel.created_at).toLocaleDateString()}</small>
                      </div>
                      <Card.Title className="fw-bold">
                        {artikel.judul}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {artikel.isi.length > 100 ? artikel.isi.substring(0, 200) + "..." : artikel.isi}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-gradient text-white">
                <h5 className="mb-0">Kategori Populer</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  {kategoriKesehatan.map(kategori => {
                    const count = artikelCountPerKategori.find(k => k.id === kategori.id)?.count || 0;
                    return (
                      <li
                        key={kategori.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-2">{kategori.icon}</span>
                          {kategori.nama_kategori}
                        </div>
                        <span className="badge bg-light text-dark rounded-pill">
                          {count}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Recent Articles Slider */}
      <div className="bg-light py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Informasi Kesehatan Terbaru</h2>
            <Button
              variant="link"
              href="/artikel"
              className="text-decoration-none d-flex align-items-center"
            >
              Lihat Semua <FaArrowRight className="ms-2" />
            </Button>
          </div>
          <div className="recent-articles">
            <Row>
              {sortedArticles.slice(0, 4).map((artikel) => (
                <Col lg={3} md={6} className="mb-4" key={artikel.id}>
                  <Card className="border-0 bg-light shadow-none h-100">
                    <a href="{`/artikel/${artikel.id}`}">
                    <Card.Img variant="top" src={artikel.images || 'default-image.png'} />
                    <Card.Body>
                      <span className="badge bg-gradient">
                        {getNamaKategori(artikel.kategori_id)}
                      </span>
                      <Card.Title className="fw-bold text-black">
                        {artikel.judul}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {artikel.isi.length > 100 ? artikel.isi.substring(0, 50) + "..." : artikel.isi}
                      </Card.Text>
                    </Card.Body>
                    </a>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>

      {/* Middle Banner */}
      <div className="position-relative container-fluid">
        <a href="#">
        <img
          src="/image/promosi-kesehatan.png"
          className="img-fluid"
          alt="Promosi Kesehatan"
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white bg-dark bg-opacity-50 p-4 rounded">
          <h2 className="fw-bold mb-3">
            Mari Mulai Hari Ini! Kesehatan Anda, Tanggung Jawab Anda.
          </h2>
          <p className="mb-4">
            Dapatkan informasi kesehatan terpercaya dan Konsultasi Penyakit Anda
          </p>
          <a className="btn btn-primary" variant="light" size="lg">
            Mulai Sekarang
          </a>
        </div>
        </a>
      </div>

      {/* Category Recommendations */}
      <Container className="py-5">
        <h2 className="fw-bold mb-4">Kategori Rekomendasi</h2>
        <Row className="g-4">
          {top3Kategori.map((kategori) => (
          <Col md={4} key={kategori.id}>
            <Card className="text-white border-0 shadow-sm">
                <Card.Img
                  src={kategori.images || "/api/placeholder/400/250"}
                  alt={kategori.nama_kategori}
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <Card.ImgOverlay className="d-flex align-items-end bg-dark bg-opacity-50">
                  <div>
                    <Card.Title className="fw-bold">{kategori.nama_kategori}</Card.Title>
                    {/* <Button variant="light" size="sm" href={`/kategori/${kategori.id}`}>
                      Jelajahi
                    </Button> */}
                  </div>
                </Card.ImgOverlay>
              </Card>
          </Col>
          ))}
        </Row>
      </Container>

      {/* Angled Articles Section */}
      <div className="bg-white py-5">
        <Container>
          <h2 className="fw-bold mb-4">Artikel Pilihan</h2>
          <Row className="g-4">
            {shuffledArticles.slice(0, 2).map((artikel) => (
            <Col md={6} key={artikel.id}>
              <Card className="border-0 shadow-none h-100 transform-card">
                <a href={`/artikel/${artikel.id}`}>
                <Row className="g-0">
                  <Col md={6}>
                    <Card.Img
                      src={artikel.images || 'default-image.png'}
                      alt={artikel.images }
                      className="h-100 object-fit-cover"
                    />
                  </Col>
                  <Col md={6}>
                    <Card.Body>
                      <span className="badge bg-danger mb-2">{getNamaKategori(artikel.kategori_id)}</span>
                      <Card.Title className="fw-bold text-black">
                        {artikel.judul}
                      </Card.Title>
                      <Card.Text className="text-black">
                        {artikel.isi.length > 100 ? artikel.isi.substring(0, 170) + "..." : artikel.isi}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
                </a>
              </Card>
            </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Information Banner */}
      <div className="bg-gradient text-white py-5">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">
            KesehatanKU Memberi Anda Informasi yang Paling Dibutuhkan
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 bg-white bg-opacity-10 rounded h-100">
                <div className="fs-1 mb-3">
                  <FaUserMd />
                </div>
                <h4>Terverifikasi Medis</h4>
                <p>
                  Semua informasi kesehatan telah diverifikasi oleh tim dokter
                  profesional kami
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white bg-opacity-10 rounded h-100">
                <div className="fs-1 mb-3">
                  <FaStethoscope />
                </div>
                <h4>Konsultasi Online</h4>
                <p>
                  Terhubung dengan dokter spesialis untuk konsultasi kesehatan
                  Anda kapan saja
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white bg-opacity-10 rounded h-100">
                <div className="fs-1 mb-3">
                  <FaHeartbeat />
                </div>
                <h4>Pemeriksaan Virtual</h4>
                <p>
                  Lakukan pengecekan kesehatan dasar secara online dengan fitur
                  kami yang inovatif
                </p>
              </div>
            </Col>
          </Row>
          <Button variant="light" size="lg" className="mt-4">
            Pelajari Lebih Lanjut
          </Button>
        </Container>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white pt-5 pb-3">
        <Container>
          <Row className="mb-5">
            <Col md={4} className="mb-4">
              <img
                width="100"
                height="auto"
                src="/image/LogoHealth.png"
                alt="LogoKesehatanKu"
              />
              <span>
                <img
                  width="100"
                  height="auto"
                  src="/image/kementrian-sehat.webp"
                  alt="LogoKementrian"
                />
              </span>
              <p>
                Sumber informasi kesehatan terpercaya dan terverifikasi untuk
                membantu Anda menjalani hidup yang lebih sehat.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a href="#" className="text-white fs-5">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white fs-5">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white fs-5">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white fs-5">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </Col>
            <Col md={2} className="mb-4">
              <h5 className="fw-bold mb-4">Kategori</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Jantung
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Diabetes
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Kesehatan Mental
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    COVID-19
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Kehamilan
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={2} className="mb-4">
              <h5 className="fw-bold mb-4">Layanan</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Konsultasi Online
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Cek Kesehatan
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Direktori Dokter
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Kalkulator Kesehatan
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4} className="mb-4">
              <h5 className="fw-bold mb-4">Berlangganan</h5>
              <p>Dapatkan informasi kesehatan terbaru langsung ke email Anda</p>
              <Form className="mt-3">
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Alamat email Anda"
                    aria-label="Email address"
                  />
                  <Button>Langganan</Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
          <hr />
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="mb-2 mb-md-0">
              © 2025 KesehatanKU. Hak Cipta Dilindungi.
            </p>
            <div>
              <a href="#" className="text-white text-decoration-none me-3">
                Syarat dan Ketentuan
              </a>
              <a href="#" className="text-white text-decoration-none me-3">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-white text-decoration-none">
                Kontak
              </a>
            </div>
          </div>
        </Container>
      </footer>

      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%) !important;
        }
        .btn-primary {
          background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%);
          color: white;
          border: none;
          transition: all 0.3s ease;
        }
        .primary {
          color: #0c54b7;
        }
        .border_primary {
          border-bottom: 2px solid #0c54b7;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #1573b1 10%, #1d53b1 90%);
          color: white;
        }
      `}</style>
    </div>
  );
}
