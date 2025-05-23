import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup } from 'react-bootstrap';
import { FaSearch, FaPhoneAlt, FaComments, FaStethoscope,FaHeartbeat, FaCalendarAlt, FaUser, FaShare, FaBookmark, FaPrint, FaThumbsUp, FaThumbsDown, FaEye, FaClock, FaTag, FaArrowLeft, FaHome, FaChevronRight } from 'react-icons/fa';

const ArticleDetailPage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeStatus, setLikeStatus] = useState(null); // null, 'like', or 'dislike'
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [email, setEmail] = useState('');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareAlert(true);
      setTimeout(() => setShowShareAlert(false), 3000);
    }
  };

  const handleLike = (type) => {
    setLikeStatus(likeStatus === type ? null : type);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Terima kasih! Anda telah berlangganan newsletter kami.');
      setEmail('');
    }
  };

  return (
    <div className=" min-vh-100">
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm sticky-top">
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
      <div className="container pt-5 pb-5">
        <div className="row">
          {/* Main Content */}
          <div className="col-lg-8">
            <div className="mb-4">
              <div className="card-body p-4">
                {/* Article Header */}
                <div className="mb-3">
                  <span className="badge bg-primary mb-2">{article.category}</span>
                  <h1 className="h2 mb-3">{article.title}</h1>
                  <p className="text-muted lead">{article.excerpt}</p>
                </div>

                {/* Article Meta */}
                <div className="d-flex flex-wrap align-items-center mb-4 text-muted small">
                  <div className="me-4 mb-2">
                    <FaUser className="me-1" />
                    {article.author}
                  </div>
                  <div className="me-4 mb-2">
                    <FaCalendarAlt className="me-1" />
                    {article.date}
                  </div>
                  <div className="me-4 mb-2">
                    <FaClock className="me-1" />
                    {article.readTime}
                  </div>
                  <div className="me-4 mb-2">
                    <FaEye className="me-1" />
                    {article.views.toLocaleString()} views
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <button 
                    className={`btn ${likeStatus === 'like' ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                    onClick={() => handleLike('like')}
                  >
                    <FaThumbsUp className="me-1" />
                    {article.likes + (likeStatus === 'like' ? 1 : 0)}
                  </button>
                  <button 
                    className={`btn ${likeStatus === 'dislike' ? 'btn-danger' : 'btn-outline-danger'} btn-sm`}
                    onClick={() => handleLike('dislike')}
                  >
                    <FaThumbsDown className="me-1" />
                    {article.dislikes + (likeStatus === 'dislike' ? 1 : 0)}
                  </button>
                  <button 
                    className={`btn ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'} btn-sm`}
                    onClick={() => setIsBookmarked(!isBookmarked)}
                  >
                    <FaBookmark className="me-1" />
                    {isBookmarked ? 'Tersimpan' : 'Simpan'}
                  </button>
                  <button className="btn btn-outline-primary btn-sm" onClick={handleShare}>
                    <FaShare className="me-1" />
                    Bagikan
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <FaPrint className="me-1" />
                    Cetak
                  </button>
                </div>

                {showShareAlert && (
                  <div className="alert alert-success py-2" role="alert">
                    Link artikel berhasil disalin ke clipboard!
                  </div>
                )}

                {/* Featured Image */}
                <div className="mb-4">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                </div>

                {/* Article Content */}
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  style={{ lineHeight: '1.8', fontSize: '16px' }}
                />

                {/* Tags */}
                <div className="mt-4 pt-3 border-top">
                  <div className="mb-2">
                    <FaTag className="me-2 text-muted" />
                    <strong>Tags:</strong>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark px-2 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
              <div className=" bg-white">
                <h5 className="mb-0">Artikel Terkait</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle.id} className="col-md-4 mb-3">
                      <div className="h-100 border-0 shadow-none">
                        <img 
                          src={relatedArticle.image}
                          className="card-img-top"
                          alt={relatedArticle.title}
                          style={{ height: '150px', objectFit: 'cover' }}
                        />
                        <div className="card-body p-3">
                          <span className="badge bg-primary mb-2 small">{relatedArticle.category}</span>
                          <h6 className="card-title">{relatedArticle.title}</h6>
                          <p className="card-text small text-muted">
                            <FaCalendarAlt className="me-1" />
                            {relatedArticle.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Popular Articles */}
            <div className="mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0"> Artikel Populer</h5>
              </div>
              <div className="list-group list-group-flush">
                {popularArticles.map((popularArticle) => (
                  <div key={popularArticle.id} className="list-group-item border-0 py-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <h6 className="mb-1">{popularArticle.title}</h6>
                        <div className="small text-muted">
                          <span className="me-3">
                            <FaTag className="me-1" />
                            {popularArticle.category}
                          </span>
                          <span>
                            <FaEye className="me-1" />
                            {popularArticle.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Categories */}
            <div className=" mb-4">
              <div className="card-header bg-white">
                <h5 className="mb-0">Kategori Kesehatan</h5>
              </div>
              <div className="list-group list-group-flush">
                {healthCategories.map((category, index) => (
                  <a key={index} href="#" className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                    <div>
                      <FaHeartbeat className="me-2 text-primary" />
                      {category.name}
                    </div>
                    <span className="badge bg-light text-dark">{category.count}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className='text-primary'>Newsletter Kesehatan</h5>
                <p className="small">Dapatkan tips kesehatan terbaru langsung di email Anda!</p>
                <div onSubmit={handleNewsletterSubmit}>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control border-0"
                      placeholder="Masukkan email Anda"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-sm w-100"
                    onClick={handleNewsletterSubmit}
                  >
                    Berlangganan
                  </button>
                </div>
              </div>
            </div>
            {/* Artikel Lainnya */}
            <div className=" bg-white">
                <h5 className="mb-0">Artikel Terkait</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle.id} className="col-md-4 mb-3">
                      <div className="h-100 border-0 d-flex justify-content-between align-items-center shadow-none">
                        <img src={relatedArticle.image}className="card-img-top"alt={relatedArticle.title}style={{ height: '70px', objectFit: 'cover' }}/>
                        <div className="card-body p-3">
                          <span className="badge bg-primary mb-2 small">{relatedArticle.category}</span>
                          <h6 className="card-title">{relatedArticle.title}</h6>
                          <p className="card-text small text-muted">
                            <FaCalendarAlt className="me-1" />
                            {relatedArticle.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default ArticleDetailPage;