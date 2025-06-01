import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import axios from "axios";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import {
  FaSearch,
  FaStethoscope,
  FaPhoneAlt,
  FaComments,
  FaHeartbeat,
  FaEnvelope,
} from "react-icons/fa";

const NavbarComponent = () => {
  const [kategoriKesehatan, setKategoriKesehatan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/kategori");
        setKategoriKesehatan(res.data.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };

    fetchKategori();
  }, []);

  const handleSelect = (id) => {
    navigate(`/cek-kesehatan/${id}`);
  };

  return (
    <Navbar bg="white" expand="lg" className="py-3 shadow-sm sticky-top">
      <Container fluid className="me-3 mx-3">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img className="img-fluid d-block" width="100" style={{ maxWidth: '80px' }} src="/image/LogoHealth.png" alt="LogoKesehatanKu" />
          <span>
            <img className="img-fluid d-block" width="100" style={{ maxWidth: '80px' }} src="/image/kementrian-sehat.webp" alt="LogoKementrian" />
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex align-items-center">
            <NavDropdown title={
                <>
                  <FaHeartbeat className="me-1" />
                  Kategori Kesehatan
                </>
              } id="nav-dropdown">
              {kategoriKesehatan.length > 0 ? (
                kategoriKesehatan.map((kategori) => (
                  <NavDropdown.Item
                    key={kategori.id}
                    href={`/kategori/${kategori.id}`}
                  >
                    <img
                      src={kategori.images || "default-image.png"}
                      alt={kategori.nama_kategori}
                      style={{
                        width: 30,
                        height: 30,
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                    />
                    {kategori.nama_kategori}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item disabled>Tidak ada kategori</NavDropdown.Item>
              )}
            </NavDropdown>

            <NavDropdown
              title={
                <>
                  <FaStethoscope className="me-1" />
                  Cek Kesehatan
                </>
              }
              id="cek-kesehatan-dropdown"
            >
              <NavDropdown.Item onClick={() => handleSelect(1)}>
                Cacar Air
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect(2)}>
                DBD
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleSelect(3)}>
                Alergi
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/kontak" className="mx-2 d-flex align-items-center">
              <FaPhoneAlt className="me-1" />
              <span>Kontak</span>
            </Nav.Link>

            <Nav.Link href="/konsultasi-kesehatan" className="mx-2 d-flex align-items-center">
              <FaComments className="me-1" />
              <span>Konsultasi Kesehatan</span>
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center mx-auto text-center justify-content-center">
            <Form className="d-flex me-3 d-none d-sm-block">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Cari informasi kesehatan..."
                  aria-label="Search"
                />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
            <Button
              variant="light"
              href="/login"
              className="border text-secondary"
            >
              Masuk
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
<style jsx>{`
  .bg-gradient {
    background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%) !important;
  }
  .btn-primaryy {
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
  .btn-primaryy:hover {
    background: linear-gradient(135deg, #1573b1 10%, #1d53b1 90%);
    color: white;
  }
`}</style>;

export default NavbarComponent;
