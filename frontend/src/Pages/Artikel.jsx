import React from 'react';
import { Dropdown, NavDropdown, Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup } from 'react-bootstrap';
import { 
  FaPhoneAlt, FaComments, FaStethoscope, FaHeartbeat, FaSearch, FaBookmark, FaShare, 
  FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaEnvelope, FaCalendarAlt  
} from 'react-icons/fa';
import { articlePresenter } from '../Presenter/ArtikelHomePresenter';

const ArticleCategoryView = () => {
  // Menggunakan presenter untuk mendapatkan data dan logic
  const {
    articles,
    categories,
    loading,
    activeSubcategory,
    error,
    filteredArticles,
    subcategories,
    getCategoryName,
    formatDate,
    truncateText,
    handleSubcategoryChange,
    handleRefresh
  } = articlePresenter.useArticleLogic();

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <Button onClick={handleRefresh} variant="primary">Coba Lagi</Button>
        </div>
      </div>
    );
  }

  // Get data dari presenter
  const featuredArticles = articlePresenter.getArticlesBySection(filteredArticles, 'featured');
  const sidebarArticles = articlePresenter.getArticlesBySection(filteredArticles, 'sidebar');
  const mainArticles = articlePresenter.getArticlesBySection(filteredArticles, 'main');
  const trendingTags = articlePresenter.getTrendingTags();
  const healthTools = articlePresenter.getHealthTools();
  const socialLinks = articlePresenter.getSocialMediaLinks();
  const footerLinks = articlePresenter.getFooterLinks();

  return (
    <div className="">
      {/* Navbar Component */}
      <NavbarComponent categories={categories} />

      <Container className="py-4">
        {/* Subcategory Navigation Component */}
        <SubcategoryNavigation 
          subcategories={subcategories}
          activeSubcategory={activeSubcategory}
          onSubcategoryChange={handleSubcategoryChange}
        />

        <Row>
          {/* Main Content */}
          <Col lg={8}>
            {/* Featured Articles Component */}
            <FeaturedArticles 
              articles={featuredArticles}
              getCategoryName={getCategoryName}
              formatDate={formatDate}
            />
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Sidebar Components */}
            <TrendingTags tags={trendingTags} />
            <HealthTools tools={healthTools} />
            <ConsultationCTA />
            <NewsletterSubscription />
            <SocialMedia links={socialLinks} />
            
            {/* Sidebar Articles */}
            <SidebarArticles 
              articles={sidebarArticles}
              formatDate={formatDate}
              truncateText={truncateText}
            />
          </Col>
        </Row>
        
        <Row>
          <Col>
            {/* Main Article List Component */}
            <MainArticleList 
              articles={mainArticles}
              activeSubcategory={activeSubcategory}
              getCategoryName={getCategoryName}
              formatDate={formatDate}
              truncateText={truncateText}
            />
          </Col>
        </Row>
      </Container>

      {/* Footer Component */}
      <FooterComponent links={footerLinks} />

      {/* Custom Styles */}
      <CustomStyles />
    </div>
  );
};

// Navbar Component
const NavbarComponent = ({ categories }) => (
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
          <NavDropdown id="nav-dropdown-dark-example" title="Kategori Kesehatan" menuVariant="light" className="no-hover">
            {categories.length > 0 ? (
              categories.map((kategori) => (
                <Dropdown.Item key={kategori.id} href={articlePresenter.getCategoryUrl(kategori.id)} className="d-flex align-items-center">
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
            <Form.Control type="search" placeholder="Cari informasi kesehatan..." aria-label="Search" />
            <Button className='btn-primary'>
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>
        <Button variant="light" href="/login" className="border-grey text-grey">
          Masuk
        </Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

// Subcategory Navigation Component
const SubcategoryNavigation = ({ subcategories, activeSubcategory, onSubcategoryChange }) => (
  <div className="bg-white border-bottom mb-2">
    <Container>
      <div className="overflow-auto">
        <Nav className="flex-nowrap py-2" style={{ whiteSpace: 'nowrap' }}>
          {subcategories.map(subcat => (
            <Nav.Item key={subcat.id}>
              <Nav.Link 
                className={`mx-2 ${activeSubcategory === subcat.name ? 'fw-bold primary border_primary border-3' : 'text-dark'}`}
                onClick={() => onSubcategoryChange(subcat.name)}
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
);

// Featured Articles Component
const FeaturedArticles = ({ articles, getCategoryName, formatDate }) => (
  <>
    {articles.map((artikel) => (
      <Card className="mb-5 border-0 shadow-none" key={artikel.id}>
        <Row className="g-0">
          <a href={articlePresenter.getArticleUrl(artikel.id)} className='text-black'>
            <Col md={12}>
              <Card.Img 
                src={artikel.images} 
                alt={artikel.judul}
                className="h-100 object-fit-cover"
              />
            </Col>
            <Col md={12}>
              <Card.Body className="d-flex flex-column h-100">
                <div className="mb-2">
                  <Badge className="me-2 bg-gradient">{getCategoryName(artikel.kategori_id)}</Badge>
                  <Badge bg="secondary">Recommended</Badge>
                </div>
                <Card.Title className="h4 fw-bold">{artikel.judul}</Card.Title>
                <Card.Text className="text-muted">{artikel.isi}</Card.Text>
                <div className="mt-auto">
                  <small className="text-muted">
                    {artikel.author} • {formatDate(artikel.created_at)} • 10 menit baca
                  </small>
                </div>
              </Card.Body>
            </Col>
          </a>
        </Row>
      </Card>
    ))}
  </>
);

// Trending Tags Component
const TrendingTags = ({ tags }) => (
  <div className="bg-white p-3 rounded shadow-none mb-4">
    <h3 className="h5 mb-3">Trending Tags</h3>
    <div className="d-flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge key={index} bg="light" text="dark" className="py-2 px-3 rounded-pill border">
          #{tag}
        </Badge>
      ))}
    </div>
  </div>
);

// Health Tools Component
const HealthTools = ({ tools }) => (
  <Card className="border-0 shadow-sm mb-4 bg-gradient" 
    style={{ background: 'linear-gradient(135deg, #1573b7 10%, #0c54b7 90%)' }}>
    <Card.Body className="p-4 text-white">
      <h3 className="h5 fw-bold mb-3">Tools Kesehatan</h3>
      <p className="small mb-3 opacity-75">
        Cek kondisi kesehatan Anda dengan tools interaktif kami
      </p>
      <Row className="g-2">
        {tools.map((tool, index) => (
          <Col sm={6} key={index}>
            <Card className="bg-white bg-opacity-25 border-0 text-white h-100 hover-card">
              <Card.Body className="p-3 text-center">
                <FaHeartbeat className="mb-2" size={20} />
                <h6 className="small mb-0">{tool.title}</h6>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
);

// Consultation CTA Component
const ConsultationCTA = () => (
  <Card className="border-0 shadow-none bg-gradient text-white mb-4">
    <Card.Body className="text-center p-4">
      <h3 className="h5 mb-3">Konsultasi Penyakit Sekarang</h3>
      <p className="small mb-3">Dapatkan jawaban untuk pertanyaan seputar kehamilan Anda.</p>
      <Button variant="light" className="primary">Konsultasi Sekarang</Button>
    </Card.Body>
  </Card>
);

// Newsletter Component
const NewsletterSubscription = () => (
  <Card className="border-0 shadow-none mb-4">
    <Card.Body className="p-4">
      <h3 className="h5 mb-3">Dapatkan Artikel Terbaru</h3>
      <p className="small mb-3">Langganan newsletter kami untuk mendapatkan informasi kesehatan terbaru.</p>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control type="email" placeholder="Email Anda" />
        </Form.Group>
        <Button className="btn-primary w-100">Langganan</Button>
      </Form>
    </Card.Body>
  </Card>
);

// Social Media Component
const SocialMedia = ({ links }) => (
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
);

// Sidebar Articles Component
const SidebarArticles = ({ articles, formatDate, truncateText }) => (
  <Col lg={12}>
    <div className="bg-white mt-4 mb-3">
      <h4 className="mb-0">Semua Artikel</h4>
    </div>
    <div className="card-body">
      <div className="row">
        {articles.map((item) => (
          <div key={item.id} className="col-12 mb-3">
            <a href={articlePresenter.getArticleUrl(item.id)} className='text-black'>
              <div className="d-flex rounded overflow-hidden shadow-none">
                <img
                  src={item.images || 'default-image.png'}
                  className="img-fluid"
                  alt={item.judul}
                  style={{
                    width: '125px',
                    height: '105px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div className="p-2 d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="mb-1">{item.judul}</h6>
                    <p className="text-muted small mb-1">
                      {truncateText(item.isi, 80)}
                    </p>
                  </div>
                  <p className="card-text small text-muted mb-0">
                    <FaCalendarAlt className="me-1" />
                    {formatDate(item.created_at)}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  </Col>
);

// Main Article List Component
const MainArticleList = ({ articles, activeSubcategory, getCategoryName, formatDate, truncateText }) => (
  <>
    <div className="d-flex justify-content-between align-items-center">
      <h1 className="h2 mb-3">Artikel {activeSubcategory} Terbaru</h1>
      <a href='#' className="px-4 primary text-decoration-none">Lihat Lebih Banyak</a>
    </div>
    <Row className="g-4">
      {articles.map((art) => (
        <Col md={4} key={art.id}>
          <Card className="h-100 border-0 shadow-none">
            <a href={articlePresenter.getArticleUrl(art.id)} className='text-black'>
              <div className="position-relative">
                <Card.Img variant="top" src={art.images} alt={art.judul}/>
                <div className="position-absolute top-0 end-0 m-2">
                  <Button variant="light" size="sm" className="rounded-circle p-1">
                    <FaBookmark className="primary" />
                  </Button>
                </div>
              </div>
              <Card.Body>
                <div className="mb-2">
                  <Badge className=" bg-gradient me-1">{getCategoryName(art.kategori_id)}</Badge>
                </div>
                <Card.Title className="h5">{art.judul}</Card.Title>
                <Card.Text className="text-muted small">{truncateText(art.isi, 200)}</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <small className="text-muted">
                  {art.author} • {formatDate(art.created_at)} • 10 menit baca
                </small>
              </Card.Footer>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);

// Footer Component
const FooterComponent = ({ links }) => (
  <footer className="bg-dark text-white pt-5 pb-3">
    <Container>
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <img width="100" height="auto" src="/image/LogoHealth.png" alt="LogoKesehatanKu" />
          <span>
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
            {links.categories.map((cat, index) => (
              <li key={index} className="mb-2">
                <a href={cat.url} className="text-white text-decoration-none">{cat.name}</a>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={2} className="mb-4">
          <h5 className="fw-bold mb-4">Layanan</h5>
          <ul className="list-unstyled">
            {links.services.map((service, index) => (
              <li key={index} className="mb-2">
                <a href={service.url} className="text-white text-decoration-none">{service.name}</a>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={4} className="mb-4">
          <h5 className="fw-bold mb-4">Berlangganan</h5>
          <p>Dapatkan informasi kesehatan terbaru langsung ke email Anda</p>
          <Form className="mt-3">
            <InputGroup className="mb-3">
              <Form.Control placeholder="Alamat email Anda" aria-label="Email address" />
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
);

// Custom Styles Component
const CustomStyles = () => (
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
);

export default ArticleCategoryView;