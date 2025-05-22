import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup } from 'react-bootstrap';
import { 
  FaPhoneAlt, FaComments, FaStethoscope, FaHeartbeat, FaSearch, FaBookmark, FaShare, 
  FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaEnvelope 
} from 'react-icons/fa';

// Dummy data untuk kategori Kehamilan
const pregnancyArticles = [
  {
    id: 1,
    title: "Panduan Lengkap Nutrisi untuk Ibu Hamil Trimester Pertama",
    excerpt: "Kebutuhan nutrisi yang tepat sangat penting bagi perkembangan janin dan kesehatan ibu selama kehamilan awal.",
    image: "/image/test.webp",
    category: "Kehamilan",
    subcategory: "Nutrisi",
    author: "dr. Anita Widjaja",
    date: "17 Mei 2025",
    readTime: "7 menit baca"
  },
  {
    id: 2,
    title: "5 Olahraga Aman untuk Ibu Hamil",
    excerpt: "Tetap aktif selama kehamilan bisa memberikan banyak manfaat bagi kesehatan ibu dan perkembangan janin.",
    image: "/image/test.webp",
    category: "Kehamilan",
    subcategory: "Olahraga",
    author: "dr. Budi Santoso, Sp.OG",
    date: "15 Mei 2025",
    readTime: "5 menit baca"
  },
  {
    id: 3,
    title: "Perubahan Tubuh yang Normal Terjadi Selama Kehamilan",
    excerpt: "Mengenal berbagai perubahan fisik dan psikologis yang umum dialami selama masa kehamilan.",
    image: "/image/test.webp",
    category: "Kehamilan",
    subcategory: "Kesehatan",
    author: "dr. Diana Safitri",
    date: "12 Mei 2025",
    readTime: "6 menit baca"
  },
  {
    id: 4,
    title: "Cara Mengatasi Morning Sickness saat Hamil",
    excerpt: "Tips dan trik efektif untuk meredakan mual dan muntah yang sering terjadi di awal kehamilan.",
    image: "/image/test.webp",
    category: "Kehamilan",
    subcategory: "Kesehatan",
    author: "dr. Endang Rahayu, Sp.OG",
    date: "10 Mei 2025",
    readTime: "4 menit baca"
  },
  {
    id: 5,
    title: "Panduan Tidur Nyaman untuk Ibu Hamil",
    excerpt: "Posisi tidur dan tips untuk mendapatkan istirahat berkualitas selama masa kehamilan.",
    image: "/image/test.webp",
    category: "Kehamilan",
    subcategory: "Tidur",
    author: "dr. Faisal Rahman",
    date: "8 Mei 2025",
    readTime: "5 menit baca"
  },
  {
    id: 6,
    title: "Pemeriksaan Kehamilan: Kapan dan Berapa Kali Harus Dilakukan",
    excerpt: "Jadwal dan jenis pemeriksaan yang perlu dilakukan selama kehamilan untuk memastikan kesehatan ibu dan janin.",
    image: "/image/test.webp",
    category: "Kehamilan",
    subcategory: "Perawatan",
    author: "dr. Gita Pratiwi, Sp.OG",
    date: "5 Mei 2025",
    readTime: "8 menit baca"
  }
];

// Subcategori kehamilan
const pregnancySubcategories = [
  { id: 1, name: "Semua", count: 53 },
  { id: 2, name: "Kesuburan", count: 8 },
  { id: 3, name: "Perencanaan", count: 5 },
  { id: 4, name: "Trimester Pertama", count: 12 },
  { id: 5, name: "Trimester Kedua", count: 10 },
  { id: 6, name: "Trimester Ketiga", count: 11 },
  { id: 7, name: "Persalinan", count: 7 },
];

// Trending tags
const trendingTags = [
  "Morning Sickness", "Nutrisi Ibu Hamil", "Perkembangan Janin", 
  "USG Kehamilan", "Olahraga Ibu Hamil", "Suplemen Kehamilan"
];

const ArticleCategoryDetail = () => {
  const [activeSubcategory, setActiveSubcategory] = useState("Semua");
  const categoryName = "Kehamilan";

  return (
    <div className="">
            {/* Navbar */}
          <Navbar bg="white" expand="lg" className="py-3 shadow-none sticky-top">
              <Container>
              <Navbar.Brand href="/home" className="text-primary">
                  <img width="100" height="auto" src="/image/LogoHealth.png" alt="LogoKesehatanKu" /><span>
                      <img width="100" height="auto" src="/image/kementrian-sehat.webp" alt="LogoKementrian" />
                  </span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mx-auto">
                  <Nav.Link href="#" className="mx-2 d-flex align-items-center">
                      <FaHeartbeat className="me-1" /> 
                      <span>Kategori Kesehatan</span>
                  </Nav.Link>
                  <Nav.Link href="#" className="mx-2 d-flex align-items-center">
                      <FaStethoscope className="me-1" /> 
                      <span>Cek Kesehatan</span>
                  </Nav.Link>
                  <Nav.Link href="/kontak" className="mx-2 d-flex align-items-center">
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
                      <Button variant="outline-primary">
                        <FaSearch />
                      </Button>
                    </InputGroup>
                  </Form>
                  <Button variant="light" href="/login" className="border-grey text-grey">Masuk</Button>
                </Navbar.Collapse>
              </Container>
            </Navbar>

      <Container className="py-4">
              {/* Subcategory Navigation */}
      <div className="bg-white border-bottom mb-2">
        <Container>
          <div className="overflow-auto">
            <Nav className="flex-nowrap py-2" style={{ whiteSpace: 'nowrap' }}>
              {pregnancySubcategories.map(subcat => (
                <Nav.Item key={subcat.id}>
                  <Nav.Link 
                    className={`mx-2 ${activeSubcategory === subcat.name ? 'fw-bold text-primary border-bottom border-primary border-3' : 'text-dark'}`}
                    onClick={() => setActiveSubcategory(subcat.name)}
                  >
                    {subcat.name} <span className="text-muted">({subcat.count})</span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
        </Container>
      </div>
        <Row>
          {/* Main Content */}
          <Col lg={8}>
            {/* Featured Article */}
            <Card className="mb-4 border-0 shadow-none">
              <Row className="g-0">
                <Col md={6}>
                  <Card.Img 
                    src="/image/test.webp" 
                    alt="Artikel Unggulan Kehamilan"
                    className="h-100 object-fit-cover"
                  />
                </Col>
                <Col md={6}>
                  <Card.Body className="d-flex flex-column h-100">
                    <div className="mb-2">
                      <Badge bg="primary" className="me-2">Kehamilan</Badge>
                      <Badge bg="secondary">Recommended</Badge>
                    </div>
                    <Card.Title className="h4 fw-bold">Panduan Lengkap untuk Mempersiapkan Kehamilan yang Sehat</Card.Title>
                    <Card.Text className="text-muted">
                      Persiapan yang matang sebelum kehamilan dapat meningkatkan peluang kehamilan yang sehat dan mengurangi komplikasi.
                    </Card.Text>
                    <div className="mt-auto">
                      <small className="text-muted">
                        dr. Nina Hartanti, Sp.OG • 19 Mei 2025 • 10 menit baca
                      </small>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>

            {/* Article List */}
            <div className="d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-3">Artikel {categoryName} Terbaru</h2>
            <a href='#' className="px-4 text-decoration-none">Lihat Lebih Banyak</a>
            </div>
            <Row className="g-4">
              {pregnancyArticles.map(article => (
                <Col md={6} key={article.id}>
                  <Card className="h-100 border-0 shadow-none">
                    <div className="position-relative">
                      <Card.Img variant="top" src={article.image} />
                      <div className="position-absolute top-0 end-0 m-2">
                        <Button variant="light" size="sm" className="rounded-circle p-1">
                          <FaBookmark className="text-primary" />
                        </Button>
                      </div>
                    </div>
                    <Card.Body>
                      <div className="mb-2">
                        <Badge bg="primary" className="me-1">{article.category}</Badge>
                        <Badge bg="light" text="dark">{article.subcategory}</Badge>
                      </div>
                      <Card.Title className="h5">{article.title}</Card.Title>
                      <Card.Text className="text-muted small">{article.excerpt}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                      <small className="text-muted">
                        {article.author} • {article.date} • {article.readTime}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Trending Tags */}
            <div className="bg-white p-3 rounded shadow-none mb-4">
              <h3 className="h5 mb-3">Trending Tags</h3>
              <div className="d-flex flex-wrap gap-2">
                {trendingTags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    bg="light" 
                    text="dark" 
                    className="py-2 px-3 rounded-pill border"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Health Check */}
            <Card className="border-0 shadow-none mb-4 bg-light">
              <Card.Body>
                <h3 className="h5 mb-3">Cek Kesehatan</h3>
                <p className="small">Cek kondisi kesehatan Anda dengan kalkulator dan tools interaktif kami.</p>
                <Row className="g-2">
                  <Col sm={6}>
                    <Card className="h-100">
                      <Card.Body className="p-2 text-center">
                        <div className="mb-2 text-primary">
                          <FaHeartbeat size={24} />
                        </div>
                        <h4 className="h6 mb-0">Kalkulator BMI</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6}>
                    <Card className="h-100">
                      <Card.Body className="p-2 text-center">
                        <div className="mb-2 text-primary">
                          <FaHeartbeat size={24} />
                        </div>
                        <h4 className="h6 mb-0">Usia Kehamilan</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6}>
                    <Card className="h-100">
                      <Card.Body className="p-2 text-center">
                        <div className="mb-2 text-primary">
                          <FaHeartbeat size={24} />
                        </div>
                        <h4 className="h6 mb-0">Kalori Harian</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm={6}>
                    <Card className="h-100">
                      <Card.Body className="p-2 text-center">
                        <div className="mb-2 text-primary">
                          <FaHeartbeat size={24} />
                        </div>
                        <h4 className="h6 mb-0">Risiko Diabetes</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Consultation CTA */}
            <Card className="border-0 shadow-none bg-primary text-white mb-4">
              <Card.Body className="text-center p-4">
                <h3 className="h5 mb-3">Konsultasi Penyakit Sekarang</h3>
                <p className="small mb-3">Dapatkan jawaban untuk pertanyaan seputar kehamilan Anda.</p>
                <Button variant="light" className="text-primary">Konsultasi Sekarang</Button>
              </Card.Body>
            </Card>

            {/* Newsletter */}
            <Card className="border-0 shadow-none mb-4">
              <Card.Body className="p-4">
                <h3 className="h5 mb-3">Dapatkan Artikel Terbaru</h3>
                <p className="small mb-3">Langganan newsletter kami untuk mendapatkan informasi kesehatan terbaru.</p>
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Control type="email" placeholder="Email Anda" />
                  </Form.Group>
                  <Button variant="primary" className="w-100">Langganan</Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-none">
              <Card.Body>
                <h3 className="h5 mb-3">Ikuti Kami</h3>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" className="rounded-circle p-2">
                    <FaFacebook />
                  </Button>
                  <Button variant="outline-info" className="rounded-circle p-2">
                    <FaTwitter />
                  </Button>
                  <Button variant="outline-success" className="rounded-circle p-2">
                    <FaWhatsapp />
                  </Button>
                  <Button variant="outline-danger" className="rounded-circle p-2">
                    <FaInstagram />
                  </Button>
                  <Button variant="outline-secondary" className="rounded-circle p-2">
                    <FaEnvelope />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
            <footer className="bg-dark text-white pt-5 pb-3">
              <Container>
                <Row className="mb-5">
                  <Col md={4} className="mb-4">
                  <img width="100" height="auto" src="/image/LogoHealth.png" alt="LogoKesehatanKu" /><span>
                      <img width="100" height="auto" src="/image/kementrian-sehat.webp" alt="LogoKementrian" />
                  </span>
                    <p>Sumber informasi kesehatan terpercaya dan terverifikasi untuk membantu Anda menjalani hidup yang lebih sehat.</p>
                    <div className="d-flex gap-3 mt-4">
                      <a href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
                      <a href="#" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
                      <a href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
                      <a href="#" className="text-white fs-5"><i className="bi bi-youtube"></i></a>
                    </div>
                  </Col>
                  <Col md={2} className="mb-4">
                    <h5 className="fw-bold mb-4">Kategori</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Jantung</a></li>
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Diabetes</a></li>
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Kesehatan Mental</a></li>
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">COVID-19</a></li>
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Kehamilan</a></li>
                    </ul>
                  </Col>
                  <Col md={2} className="mb-4">
                    <h5 className="fw-bold mb-4">Layanan</h5>
                    <ul className="list-unstyled">
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Konsultasi Online</a></li>
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Cek Kesehatan</a></li>
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Direktori Dokter</a></li>
                      <li className="mb-2"><a href="#" className="text-white text-decoration-none">Kalkulator Kesehatan</a></li>
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
                        <Button variant="primary">Langganan</Button>
                      </InputGroup>
                    </Form>
                  </Col>
                </Row>
                <hr />
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
                  <p className="mb-2 mb-md-0">© 2025 KesehatanKU. Hak Cipta Dilindungi.</p>
                  <div>
                    <a href="#" className="text-white text-decoration-none me-3">Syarat dan Ketentuan</a>
                    <a href="#" className="text-white text-decoration-none me-3">Kebijakan Privasi</a>
                    <a href="#" className="text-white text-decoration-none">Kontak</a>
                  </div>
                </div>
              </Container>
            </footer>
    </div>
  );
};

export default ArticleCategoryDetail;