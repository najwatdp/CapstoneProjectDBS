import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { Dropdown, NavDropdown, Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup } from 'react-bootstrap';
import { 
  FaPhoneAlt, FaComments, FaStethoscope, FaHeartbeat, FaSearch, FaBookmark, FaShare, 
  FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaEnvelope 
} from 'react-icons/fa';


const ArticleCategory = () => {
  const [artikel, setArtikel] = useState([]);
  const [kategoriKesehatan, setKategoriKesehatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState("Semua");

  useEffect(() => {
    fetchData();
  }, []);

  // Ambil data artikel dan kategori sekaligus
  const fetchData = async () => {
    try {
      const [artikelRes, kategoriRes] = await Promise.all([
        axios.get("http://localhost:5000/api/artikel"),
        axios.get("http://localhost:5000/api/kategori"),
      ]);

      // Set artikel
      const artikelData = artikelRes.data;
      if (Array.isArray(artikelData)) {
        setArtikel(artikelData);
      } else if (Array.isArray(artikelData.artikel)) {
        setArtikel(artikelData.artikel);
      } else if (Array.isArray(artikelData.data)) {
        setArtikel(artikelData.data);
      } else {
        setArtikel([]);
        console.error("Struktur data artikel tidak dikenali:", artikelData);
      }

      // Set kategori
      const kategoriData = kategoriRes.data;
      if (Array.isArray(kategoriData)) {
        setKategoriKesehatan(kategoriData);
      } else if (Array.isArray(kategoriData.kategori)) {
        setKategoriKesehatan(kategoriData.kategori);
      } else if (Array.isArray(kategoriData.data)) {
        setKategoriKesehatan(kategoriData.data);
      } else {
        setKategoriKesehatan([]);
        console.error("Struktur data kategori tidak dikenali:", kategoriData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Fungsi filter artikel berdasarkan kategori aktif
  const filteredArticles = activeSubcategory === "Semua"
    ? artikel
    : artikel.filter(a => {
      const kategori = kategoriKesehatan.find(k => k.id === a.kategori_id);
      return kategori && kategori.nama_kategori === activeSubcategory;
    });

  // Hitung jumlah artikel per kategori (untuk badge count)
  const kategoriWithCount = kategoriKesehatan.map(kategori => ({
    ...kategori,
    count: artikel.filter(a => a.kategori_id === kategori.id).length,
  }));

  // Untuk subkategori navigasi, tambahkan opsi "Semua" sebagai default
  const pregnancySubcategories = [
    { id: 'semua', name: 'Semua', count: artikel.length },
    ...kategoriWithCount.map(k => ({
      id: k.id,
      name: k.nama_kategori,
      count: k.count,
    })),
  ];
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
    <div className="">
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
                                src={kategori.image_url || kategori.image || 'default-image.png'} 
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
                      <Button variant="outline-primary">
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
                      style={{ cursor: 'pointer' }}
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
            {filteredArticles.length > 0 && (
            <Card className="mb-4 border-0 shadow-none">
              <Row className="g-0">
                <Col md={6}>
                  <Card.Img 
                      src={filteredArticles[0].image_url || filteredArticles[0].image || '/image/default-image.png'} 
                      alt={filteredArticles[0].judul}
                      className="h-100 object-fit-cover"
                    />
                </Col>
                <Col md={6}>
                  <Card.Body className="d-flex flex-column h-100">
                    <div className="mb-2">
                      <Badge bg="primary" className="me-2">{getNamaKategori(filteredArticles[0].kategori_id)}</Badge>
                      <Badge bg="secondary">Recommended</Badge>
                    </div>
                    <Card.Title className="h4 fw-bold">{filteredArticles[0].judul}</Card.Title>
                    <Card.Text className="text-muted">
                      {filteredArticles[0].excerpt || filteredArticles[0].isi?.slice(0, 100) + '...'}
                    </Card.Text>
                    <div className="mt-auto">
                      <small className="text-muted">
                        {filteredArticles[0].author || 'Admin'} • {new Date(filteredArticles[0].created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • 10 menit baca
                      </small>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            )}

            {/* Article List */}
            <div className="d-flex justify-content-between align-items-center">
            <h2 className="h4 mb-3">Artikel {activeSubcategory} Terbaru</h2>
            <a href='#' className="px-4 text-decoration-none">Lihat Lebih Banyak</a>
            </div>
            <Row className="g-4">
              {filteredArticles.slice(1).map((art) => (
                <Col md={6} key={art.id}>
                  <Card className="h-100 border-0 shadow-none">
                    <div className="position-relative">
                      <Card.Img variant="top" src={art.image} alt={art.judul}/>
                      <div className="position-absolute top-0 end-0 m-2">
                        <Button variant="light" size="sm" className="rounded-circle p-1">
                          <FaBookmark className="text-primary" />
                        </Button>
                      </div>
                    </div>
                    <Card.Body>
                      <div className="mb-2">
                        <Badge bg="primary" className="me-1">{getNamaKategori(art.kategori_id)}</Badge>
                        {/* Kamu bisa tambahkan subkategori jika ada */}
                      </div>
                      <Card.Title className="h5">{art.judul}</Card.Title>
                      <Card.Text className="text-muted small">{art.excerpt || art.isi?.slice(0, 100) + '...'}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0">
                      <small className="text-muted">
                        {art.author || 'Admin'} • {new Date(art.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • 10 menit baca
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
                {['Sehat', 'Gizi', 'Kehamilan', 'Mental', 'Covid'].map((tag, index) => (
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
  // Fungsi untuk mendapatkan nama kategori berdasarkan ID
  function getNamaKategori(kategoriId) {
    const kategori = kategoriKesehatan.find(k => k.id === kategoriId);
    return kategori ? kategori.nama_kategori : 'Kategori Tidak Ditemukan';
  }
};

export default ArticleCategory;