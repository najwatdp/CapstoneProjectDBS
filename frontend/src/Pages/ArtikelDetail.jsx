import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Dropdown, NavDropdown, Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup } from 'react-bootstrap';
import { FaSearch, FaPhoneAlt, FaComments, FaStethoscope, FaHeartbeat, FaCalendarAlt, FaUser, FaShare, FaBookmark, FaPrint, FaThumbsUp, FaThumbsDown, FaEye, FaClock, FaTag, FaArrowLeft, FaHome, FaChevronRight } from 'react-icons/fa';
import { ArticlePresenter } from '../Presenter/DetailArtikelPresenter';

const ArticleDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [artikel, setArtikel] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [kategoriKesehatan, setKategoriKesehatan] = useState([]);
  const [randomArticles, setRandomArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeStatus, setLikeStatus] = useState(null);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const { id } = useParams();
  const presenter = new ArticlePresenter();

  const viewInterface = {
    setLoading: (loading) => setLoading(loading),
    setArticleData: (data) => setArtikel(data),
    setCategories: (categories) => setKategoriKesehatan(categories),
    setRelatedArticles: (articles) => setRandomArticles(articles),
    setPopularArticles: (articles) => setPopularArticles(articles),
    showError: (message) => setError(message),
    updateLikeStatus: (status, likes, dislikes) => {
      setLikeStatus(status);
      if (artikel) {
        setArtikel(prev => ({ ...prev, likes, dislikes }));
      }
    },
    updateBookmarkStatus: (status) => setIsBookmarked(status),
    showShareSuccess: () => {
      setShowShareAlert(true);
      setTimeout(() => setShowShareAlert(false), 3000);
    },
    showShareError: () => alert('Gagal menyalin link'),
    showNewsletterSuccess: (message) => alert(message),
    showNewsletterError: (message) => alert(message),
    clearNewsletterEmail: () => setEmail('')
  };

  useEffect(() => {
    presenter.setView(viewInterface);
    presenter.loadArticleData(id);
  }, [id]);

  const handleLike = (status) => {
    presenter.handleLike(likeStatus, status, artikel);
  };

  const handleBookmark = () => {
    presenter.handleBookmark(isBookmarked);
  };

  const handleShare = () => {
    presenter.handleShare();
  };

  const handlePrint = () => {
    presenter.handlePrint();
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    presenter.handleNewsletterSubmit(email);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h4>{error}</h4>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="text-center mt-5">
        <h4>Artikel tidak ditemukan</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm sticky-top">
        <Container>
          <Navbar.Brand href="/home" className="primary">
            <img width="100" height="auto" src="/image/LogoHealth.png" alt="LogoKesehatanKu" />
            <span>
              <img width="100" height="auto" src="/image/kementrian-sehat.webp" alt="LogoKementrian" />
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
                <Button className='btn-primary'>
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
            <Button variant="light" href="/login" className="border-grey text-grey">Masuk</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="container pt-5 pb-5">
        <div className="row">
          {/* Article Content */}
          <div className="col-lg-8">
            <div className="mb-4">
              <div className="card-body p-4">
                {/* Article Header */}
                <div className="mb-3">
                  <span className="badge bg-gradient mb-1" style={{ width: '100px' }}>
                    {presenter.getCategoryName(kategoriKesehatan, artikel.kategori_id)}
                  </span>
                  <h1 className="h2 mb-3">{artikel.judul}</h1>
                  <p className="text-muted mw-100 word-break overflow-wrap-break-word" style={{ maxWidth: 800 + 'px' }}>
                    <div dangerouslySetInnerHTML={{__html: artikel.isi }}></div>
                  </p>
                </div>

                {/* Article Meta */}
                <div className="d-flex flex-wrap align-items-center mb-4 text-muted small">
                  <div className="me-4 mb-2">
                    <FaUser className="me-1" />
                    {artikel.author}
                  </div>
                  <div className="me-4 mb-2">
                    <FaCalendarAlt className="me-1" />
                    {artikel.created_at}
                  </div>
                  <div className="me-4 mb-2">
                    <FaClock className="me-1" />
                    {artikel.read_time || '5 menit'}
                  </div>
                  <div className="me-4 mb-2">
                    <FaEye className="me-1" />
                    {artikel.views} views
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  <button 
                    className={`btn ${likeStatus === 'like' ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                    onClick={() => handleLike('like')}
                  >
                    <FaThumbsUp className="me-1" />
                    {artikel.likes}
                  </button>
                  <button 
                    className={`btn ${likeStatus === 'dislike' ? 'btn-danger' : 'btn-outline-danger'} btn-sm`}
                    onClick={() => handleLike('dislike')}
                  >
                    <FaThumbsDown className="me-1" />
                    {artikel.dislikes}
                  </button>
                  <button 
                    className={`btn ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'} btn-sm`}
                    onClick={handleBookmark}
                  >
                    <FaBookmark className="me-1" />
                    {isBookmarked ? 'Tersimpan' : 'Simpan'}
                  </button>
                  <button className="btn btn-outline-primary btn-sm" onClick={handleShare}>
                    <FaShare className="me-1" />
                    Bagikan
                  </button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={handlePrint}>
                    <FaPrint className="me-1" />
                    Cetak
                  </button>
                </div>

                {showShareAlert && (
                  <div className="alert alert-success py-2" role="alert">
                    Link artikel berhasil disalin ke clipboard!
                  </div>
                )}

                <div className="mb-4">
                  <img 
                    src={artikel.images || 'default-image.png'} 
                    alt={artikel.judul}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                </div>

                <div 
                  className="article-content word-break overflow-wrap-break-word"
                  dangerouslySetInnerHTML={{ __html: artikel.isi }}
                  style={{ lineHeight: '1.8', fontSize: '16px' }}
                />

                {/* Tags */}
                <div className="mt-4 pt-3 border-top">
                  <div className="mb-2">
                    <FaTag className="me-2 text-muted" />
                    <strong>Tags:</strong>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {artikel.tags && artikel.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark px-2 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">

            <div className="mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Artikel Populer</h5>
              </div>
              <div className="list-group list-group-flush">
                {popularArticles.map((popularArticle) => (
                  <div key={popularArticle.id} className="list-group-item border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{popularArticle.judul}</h6>
                        <div className="small text-muted">
                          <span className="me-3">
                            <FaTag className="me-1" />
                            {presenter.getCategoryName(kategoriKesehatan, popularArticle.kategori_id)}
                          </span>
                          <span>
                            <FaEye className="me-1" />
                            {popularArticle.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Categories */}
            <div className="mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Kategori Kesehatan</h5>
              </div>
              <div className="list-group list-group-flush">
                {kategoriKesehatan.map((category, index) => (
                  <a key={index} href="#" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                    <div>
                      <FaHeartbeat className="me-2 primary" />
                      {category.nama_kategori}
                    </div>
                    <span className="badge bg-light text-dark">{category.count || 0}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="primary">Newsletter Kesehatan</h5>
                <p className="small">Dapatkan tips kesehatan terbaru langsung di email Anda!</p>
                <form onSubmit={handleNewsletterSubmit}>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control border-0"
                      placeholder="Masukkan email Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-sm w-100"
                  >
                    Berlangganan
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white mt-4 mb-3">
              <h4 className="mb-0">Semua Artikel</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {randomArticles.map((item) => (
                  <div key={item.id} className="col-12 mb-3">
                    <a href={`/artikel/${item.id}`} className='text-black'>
                      <div className="d-flex rounded overflow-hidden shadow-none">
                        <img
                          src={item.images || 'default-image.png'}
                          className="img-fluid"
                          alt={item.judul}
                          style={{
                            width: '120px',
                            height: '100px',
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />
                        <div className="p-2 d-flex flex-column justify-content-between">
                          <div>
                            <h6 className="mb-1">{item.judul}</h6>
                            <p className="text-muted small mb-1">
                              {item.isi?.slice(0, 70) + '...'}
                            </p>
                          </div>
                          <p className="card-text small text-muted mb-0">
                            <FaCalendarAlt className="me-1" />
                            {presenter.formatDate(item.created_at)}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="bg-white">
            <h3 className="mb-3">Artikel Terkait</h3>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              {randomArticles.map((item) => (
                <div key={item.id} className="col-12 mb-4">
                  <a href={`/artikel/${item.id}`} className='text-black'>
                    <div className="row h-100 shadow-none">
                      <div className="col-12 col-md-6">
                        <img
                          src={item.images || 'default-image.png'}
                          className="img-fluid w-100"
                          alt={item.judul}
                          style={{ height: '100%', maxHeight: '300px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-3">
                        <span className="badge bg-gradient mb-1" style={{ width: '100px' }}>
                          {presenter.getCategoryName(kategoriKesehatan, item.kategori_id)}
                        </span>
                        <h3 className="card-title">{item.judul}</h3>
                        <p className="text">{(item.isi?.slice(0, 400) + '...')}</p>
                        <div className='col-12 col-md-6 d-flex gap-x-px justify-content-start align-items-start'>
                          <p className="text">{item.author}</p>
                          <p className="card-text text-muted">
                            <FaCalendarAlt className="me-1" />
                            {presenter.formatDate(item.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
                              <Button className='btn-primary'>Langganan</Button>
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
        .border-primary {
          border: #0c54b7;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #1573b1 10%, #1d53b1 90%);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ArticleDetailPage;