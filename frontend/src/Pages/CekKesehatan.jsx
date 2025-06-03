import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaHeartbeat, FaClipboardCheck, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../Component/NavbarComponent';
import FooterComponent from '../Component/FooterComponent';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Form,
  Alert,
  Spinner,
  Badge,
  CardGroup
} from 'react-bootstrap';
import KesehatanPresenter from '../Presenter/cekKesehatanPresenter';
import Cookie from '../Model/accessCookie';

const CekKesehatan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [pertanyaan, setPertanyaan] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [jawaban, setJawaban] = useState("");

  const [showPertanyaan, setShowPertanyaan] = useState(true);

  const diabetes = [
    {
      name: "continuous_sneezing",
      pertanyaan: "Apakah Anda mengalami bersin terus-menerus dalam sehari?"
    },
    {
      name: "shivering",
      pertanyaan: "Apakah Anda mengalami menggigil meskipun suhu di sekitar Anda tidak terlalu dingin?"
    },
    {
      name: "chills",
      pertanyaan: "Apakah Anda mengalami mata berair secara terus-menerus?"
    }
  ];

  const presenter = new KesehatanPresenter({
    model: Cookie,
    view: {
      setLoading: setLoading,
      navigate: navigate,
    }
  });

  function hanldePertanyaan() {
    if (pertanyaan >= (diabetes.length - 1)) {
      setJawaban(jawaban + " " + diabetes[pertanyaan].name);
      setShowPertanyaan(false);
      console.log(jawaban);
      return;
    }
    if (selectedAnswer) {
      console.log("ini berjalan");
      setJawaban(jawaban + " " + diabetes[pertanyaan].name);
    }
    setPertanyaan(pertanyaan + 1);
  }

  // Fetch info penyakit pada mount atau id berubah
  useEffect(() => {
  }, []);

  // Mulai sesi cek kesehatan
  const startSession = async () => {
    // await presenter.startCekkesehatan();
  };

  // Restart sesi cek kesehatan
  const handleRestart = () => {
    startSession();
  };

  // Helper function untuk mendapatkan variant warna berdasarkan level risiko
  const getRiskVariant = (level) => {
    switch (level?.toLowerCase()) {
      case 'tinggi': return 'danger';
      case 'sedang': return 'warning';
      case 'rendah': return 'success';
      default: return 'info';
    }
  };

  // Helper function untuk mendapatkan icon berdasarkan level risiko
  const getRiskIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'tinggi': return <FaExclamationTriangle className="me-2" />;
      case 'sedang': return <FaClipboardCheck className="me-2" />;
      case 'rendah': return <FaCheckCircle className="me-2" />;
      default: return <FaHeartbeat className="me-2" />;
    }
  };

  if (loading) {
    return (
      <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <h5 className="text-muted">Memuat data kesehatan...</h5>
        </div>
      </Container>
    );
  }


return (
  showPertanyaan ? (
        <>
      <Container>
        <Row className="justify-content-center">
          <Col>
            {/* <Button
                  variant="outline-secondary"
                  onClick={() => navigate(-1)}
                  className="mb-4 d-flex align-items-center"
                  style={{ width: 'fit-content' }}
                >
                  <FaChevronLeft className="me-2" /> Kembali
                </Button> */}
            <Card className="shadow-sm mb-4 mt-4 border-0 overflow-hidden">
              <div className="bg-gradient text-white p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-bold">Pemeriksaan Kesehatan</h5>
                  <Badge bg="light" text="dark" className="px-3 py-2">
                  </Badge>
                </div>
                <ProgressBar
                  now={((pertanyaan + 1) / diabetes.length) * 100}
                  variant="info"
                  style={{ height: '8px', borderRadius: '4px' }}
                  className="mb-0"
                />
              </div>

              <Card.Body className="p-5">
                <div className="mb-3">
                  <h4 className="fw-bold text-dark mb-4 lh-base">
                    {diabetes[pertanyaan].pertanyaan}
                  </h4>
                </div>

                <Form className="mb-4 shadow-none">
                    <div className="d-grid gap-1">
                        <Card
                          // key={option.value}
                          className={`border-2 border-primary bg-primary bg-opacity-10`}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setSelectedAnswer(true)}
                        >
                          <Card.Body className="p-4">
                            <Form.Check
                              type="radio"
                              id={``}
                              name="answer"
                              checked={selectedAnswer}
                              onChange={() => setSelectedAnswer("ya")}
                              className="d-flex align-items-center"
                              style={{ cursor: 'pointer' }}
                            >
                              <Form.Check.Input
                                className="me-3"
                                style={{
                                  text: 'white',
                                  transform: 'scale(1.2)',
                                  accentColor: '#0d6efd'
                                }}
                              />
                              <Form.Check.Label
                                className="fw-medium text-dark mb-0 flex-grow-1"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                              >
                                Ya
                              </Form.Check.Label>
                            </Form.Check>
                          </Card.Body>
                        </Card>
                        <Card
                          // key={option.value}
                          className={`border-2 border-primary bg-primary bg-opacity-10`}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => setSelectedAnswer(false)}
                        >
                          <Card.Body className="p-4">
                            <Form.Check
                              type="radio"
                              id={``}
                              name="answer"
                              value="no"
                              checked={!selectedAnswer}
                              onChange={() => setSelectedAnswer(false)}
                              className="d-flex align-items-center"
                              style={{ cursor: 'pointer' }}
                            >
                              <Form.Check.Input
                                className="me-3"
                                style={{
                                  text: 'white',
                                  transform: 'scale(1.2)',
                                  accentColor: '#0d6efd'
                                }}
                              />
                              <Form.Check.Label
                                className="fw-medium text-dark mb-0 flex-grow-1"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                              >
                                Tidak
                              </Form.Check.Label>
                            </Form.Check>
                          </Card.Body>
                        </Card>
                        <Button variant='primary' className='p-1 px-3' onClick={hanldePertanyaan}>Next</Button>
                      </div>
                    </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>                
    </>
  ) : (
    <>
  <div className="min-vh-100 d-flex flex-column">
    <NavbarComponent />
    <main className="flex-grow-1">
        <Container>
          <Row className="justify-content-center">
            <Col>
              {/* <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="mb-4 d-flex align-items-center"
                style={{ width: 'fit-content' }}
              >
                <FaChevronLeft className="me-2" /> Kembali
              </Button> */}

              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-success text-white p-4 text-center">
                  <FaCheckCircle size={48} className="mb-3" />
                  <h3 className="mb-0 fw-bold">Hasil Pemeriksaan</h3>
                  <p className="mb-0 opacity-75"></p>
                </div>

                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <Badge
                      className="px-4 py-2 fs-6 mb-3"
                      style={{ borderRadius: '20px' }}
                    >
                      Risiko
                    </Badge>
                  </div>

                  <Card className={`border mb-4`}>
                    <Card.Body>
                      <h4 className={`text fw-bold mb-3`}>
                      </h4>
                      <p className="mb-0 text-muted">
                      </p>
                    </Card.Body>
                  </Card>

                    <Alert variant="primary" className="border-0 shadow-sm">
                      <Alert.Heading className="h6 fw-bold">
                        <FaClipboardCheck className="me-2" />
                        Rekomendasi untuk Anda:
                      </Alert.Heading>
                      <p className="mb-0"> </p>
                    </Alert>

                  <div className="d-flex gap-3 flex-wrap justify-content-center mt-4">
                    <Button
                      variant="primary"
                      onClick={handleRestart}
                      className="px-4 py-2 fw-semibold"
                      style={{ borderRadius: '10px' }}
                    >
                      <FaHeartbeat className="me-2" />
                      Coba Lagi
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigate(-1)}
                      className="px-4 py-2"
                      style={{ borderRadius: '10px' }}
                    >
                      Kembali ke Menu
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    </main>
    <FooterComponent />
  </div>
  </>
  )
);
};

export default CekKesehatan;