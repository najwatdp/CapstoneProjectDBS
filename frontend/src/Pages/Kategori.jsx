import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, NavDropdown, Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup, Spinner,Breadcrumb  } from 'react-bootstrap';
import { 
  FaPhoneAlt, FaComments, FaStethoscope, FaSearch,
} from 'react-icons/fa';
import { Link } from 'react-router';

const KategoriPage = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchKategori = async () => {
    try {
      const kategoriRes = await axios.get("http://localhost:5000/api/kategori");
      const artikelRes = await axios.get("http://localhost:5000/api/artikel");

      const kategoriData = kategoriRes.data.data;
      const artikelData = artikelRes.data.data;

      const kategoriWithCount = kategoriData.map(k => {
        const count = artikelData.filter(a => String(a.kategori_id) === String(k.id)).length;
        return { ...k, count };
      });

      setKategoriList(kategoriWithCount);
    } catch (err) {
      console.error("Gagal mengambil kategori:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  const filteredKategori = kategoriList.filter((kategori) =>
    kategori.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div className="kategori">
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
                                  {kategoriList.length > 0 ? (
                                  kategoriList.map((kategori) => (
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
                              <Button className='btn-primary'>
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
        {/* Breadcrumb */}
        <Container className="py-3">
            <Breadcrumb>
            <Breadcrumb.Item href="/home" className="primary">Beranda</Breadcrumb.Item>
            <Breadcrumb.Item href="/kategori" active>Kategori</Breadcrumb.Item>
            </Breadcrumb>
        </Container>

        <Container className="mb-4">
            <div className="text-center mb-5">
                <h3 className="mb-4 fw-bold" style={{background: 'linear-gradient(135deg, #1573b7 10%, #0c54b7 90%)',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',}}>Pilih Kategori Informasi Kesehatan</h3>
                {/* Search bar */}
                <Form className="d-flex justify-content-center">
                    <Form.Control
                    type="search"
                    placeholder="Cari kategori..."
                    className="w-75 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form>
            </div>
        <Row>
            {filteredKategori.length > 0 ? (
            filteredKategori.map((kategori) => (
                <Col key={kategori.id} md={4} sm={6} className="mb-4">
                <Card className="h-100 shadow-sm border-0">
                    <Link to={`/artikel/${kategori.id}`} className="text-decoration-none text-dark">
                    <Card.Img 
                        variant="top" 
                        src={kategori.images || '/image/default-kategori.jpg'} 
                        style={{ height: '200px', objectFit: 'cover' }} 
                        alt={kategori.nama_kategori}
                    />
                    <Card.Body>
                        <Card.Title className="fw-semibold">{kategori.nama_kategori}</Card.Title>
                        <Card.Text className="text-muted">
                        {kategori.count} artikel tersedia
                        </Card.Text>
                    </Card.Body>
                    </Link>
                </Card>
                </Col>
            ))
            ) : (
            <Col>
                <p className="text-muted">Belum ada kategori tersedia.</p>
            </Col>
            )}
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
};


export default KategoriPage;
