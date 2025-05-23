import React, { useState } from "react";
import {
  FaHeartbeat,
  FaStethoscope,
  FaPhoneAlt,
  FaComments,
  FaSearch,
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaPhone,
  FaWhatsapp,
  FaFax,
  FaPaperPlane,
  FaUserMd,
  FaQuestionCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
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
} from "react-bootstrap";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!formData.name || !formData.email || !formData.message) {
      setAlertType("danger");
      setAlertMessage("Mohon lengkapi semua field yang wajib diisi!");
      setShowAlert(true);
      return;
    }

    // Simulasi pengiriman form
    setAlertType("success");
    setAlertMessage(
      "Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda."
    );
    setShowAlert(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    });

    // Hide alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
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

      {/* Hero Section */}
      <div className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">Hubungi Kami</h1>
              <p className="lead mb-4">
                Tim KesehatanKU siap membantu Anda dengan pertanyaan seputar
                kesehatan. Hubungi kami melalui berbagai channel yang tersedia
                atau kunjungi langsung kantor kami.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <FaPhoneAlt size={120} className="opacity-75" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 flex-grow-1">
        <div className="row">
          {/* Contact Form */}
          <div className="col-lg-8 mb-5">
            <div className="card shadow-none">
              <div className="card-body p-4">
                {showAlert && (
                  <div
                    className={`alert alert-${alertType} alert-dismissible fade show mb-4`}
                    role="alert"
                  >
                    {alertMessage}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowAlert(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <div onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Nama Lengkap <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap Anda"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="nama@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Nomor Telepon
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+62 xxx xxxx xxxx"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Kategori Pertanyaan
                        </label>
                        <select
                          className="form-select form-select-lg"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                        >
                          <option value="">Pilih kategori...</option>
                          <option value="konsultasi">
                            Konsultasi Kesehatan
                          </option>
                          <option value="teknis">Bantuan Teknis Website</option>
                          <option value="kerjasama">
                            Kerjasama & Partnership
                          </option>
                          <option value="keluhan">Keluhan & Saran</option>
                          <option value="media">Media & Pers</option>
                          <option value="lainnya">Lainnya</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Subjek</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subjek pesan Anda"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Pesan <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    />
                    <div className="form-text text-muted">
                      Minimum 10 karakter. Jelaskan pertanyaan Anda dengan
                      detail.
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm py-3"
                      onClick={handleSubmit}
                    >
                      <FaPaperPlane className="me-2" />
                      Kirim Pesan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4">
            {/* Contact Details */}
            <div className="card shadow-none mb-4">
              <h5 className="mb-0 px-4 py-4 align-items-center">
                <FaPhoneAlt className="me-2" />
                Informasi Kontak
              </h5>
              <div className="card-body p-4">
                <div className="mb-4">
                  <h6 className="text-primary fw-bold mb-2">
                    <FaMapMarkerAlt className="me-2" />
                    Alamat Kantor
                  </h6>
                  <p className="mb-0 text-muted">
                    Jl. H.R. Rasuna Said Kav. X5 No. 4-9
                    <br />
                    Kuningan, Jakarta Selatan 12950
                    <br />
                    Indonesia
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-primary fw-bold mb-2">
                    <FaPhone className="me-2" />
                    Telepon
                  </h6>
                  <p className="mb-1">
                    <a
                      href="tel:+622150829999"
                      className="text-decoration-none"
                    >
                      +62 21 5082 9999
                    </a>
                  </p>
                  <p className="mb-0 text-muted small">
                    Senin - Jumat, 08:00 - 17:00 WIB
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-primary fw-bold mb-2">
                    <FaWhatsapp className="me-2" />
                    WhatsApp
                  </h6>
                  <p className="mb-0">
                    <a
                      href="https://wa.me/6281234567890"
                      className="text-decoration-none text-success"
                    >
                      +62 812 3456 7890
                    </a>
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="text-primary fw-bold mb-2">
                    <FaEnvelope className="me-2" />
                    Email
                  </h6>
                  <p className="mb-1">
                    <a
                      href="mailto:info@kesehatanku.id"
                      className="text-decoration-none"
                    >
                      info@kesehatanku.id
                    </a>
                  </p>
                  <p className="mb-0">
                    <a
                      href="mailto:konsultasi@kesehatanku.id"
                      className="text-decoration-none"
                    >
                      konsultasi@kesehatanku.id
                    </a>
                  </p>
                </div>

                <div>
                  <h6 className="text-primary fw-bold mb-2">
                    <FaClock className="me-2" />
                    Jam Operasional
                  </h6>
                  <p className="mb-1 small">Senin - Jumat: 08:00 - 17:00 WIB</p>
                  <p className="mb-1 small">Sabtu: 08:00 - 12:00 WIB</p>
                  <p className="mb-0 small">Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="row mt-5">
          <div className="col">
            <div className="card shadow-none border-0">
              <div className="card-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6751230529176!2d109.19449517381055!3d-6.929379993070429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fc75b83eba765%3A0x74959d8a1794d51d!2sJl.%20Anggrek%2C%20Bulakwaru%2C%20Kec.%20Tarub%2C%20Kabupaten%20Tegal%2C%20Jawa%20Tengah%2052184!5e0!3m2!1sen!2sid!4v1747913801887!5m2!1sen!2sid"
                    width="400"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body p-4 text-center">
                <FaUserMd size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Konsultasi Penyakit</h5>
                <p className="text-muted">
                  Butuh konsultasi penyakit anda secara langsung? Gunakan layanan
                  konsultasi penyakit kami secara online yang tersedia 24/7.
                </p>
                <button className="btn btn-primary">Mulai Konsultasi</button>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-none border-0">
              <div className="card-body p-4 text-center">
                <FaStethoscope size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Cek Kesehatan</h5>
                <p className="text-muted">
                  Pantau kondisi kesehatan Anda dengan berbagai tools
                  pemeriksaan kesehatan yang telah terverifikasi medis.
                </p>
                <button className="btn btn-primary">Mulai Cek Kesehatan</button>
              </div>
            </div>
          </div>
        </div>
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
                  <Button variant="primary">Langganan</Button>
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
    </div>
  );
}
