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

const CekKesehatan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cekKesehatanDetail, setCekKesehatanDetail] = useState(null);

  const [sessionId, setSessionId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [started, setStarted] = useState(false);

  const API_BASE = 'http://localhost:5000/api';

  // Fetch info penyakit pada mount atau id berubah
  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/cek-kesehatan/${id}`);
        if (!res.ok) throw new Error('Data tidak ditemukan');
        const data = await res.json();
        setCekKesehatanDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInfo();
  }, [id]);

  // Mulai sesi cek kesehatan
  const startSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/cek-kesehatan/${id}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Gagal mulai sesi');
      const data = await res.json();

      // Parsing opsi jawaban dari string JSON ke array objek
      let opsiArray = [];
        try {
        opsiArray = JSON.parse(data.question.opsi_jawaban || '[]');
        } catch (err) {
        console.error("Gagal parse opsi_jawaban:", err);
        }
      const opsiFormatted = opsiArray.map((item, idx) => ({
        label: item,
        value: idx.toString(),
        score: item.toLowerCase() === 'ya' ? 1 : 0,
      }));

      setSessionId(data.session_id);
      setCurrentQuestion({ ...data.question, opsi_jawaban: opsiFormatted });
      setProgress(data.progress);
      setSelectedAnswer('');
      setStarted(true);
      setCompleted(false);
      setResult(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Submit jawaban dan proses lanjut pertanyaan/hasil
  const handleAnswerSubmit = async () => {
  if (!selectedAnswer) {
    alert('Silakan pilih jawaban terlebih dahulu');
    return;
  }
  try {
    setSubmitting(true);

    const selectedOption = currentQuestion.opsi_jawaban.find(opt => opt.value === selectedAnswer);

    const payload = {
      session_id: sessionId,
      question_id: Number(currentQuestion.id),
      answer: selectedOption?.label || selectedAnswer,
    };

    console.log('Mengirim jawaban:', payload);

    const res = await fetch(`${API_BASE}/cek-kesehatan/submit-answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log(payload)
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gagal mengirim jawaban: ${res.status} - ${errText}`);
    }

    const data = await res.json();

    if (data.completed) {
      setCompleted(true);
      setResult(data.result);
    } else {
      // Format opsi jawaban pada question baru
      if(data.nextQuestion && data.nextQuestion.opsi_jawaban){
        const rawOpsi = JSON.parse(data.nextQuestion.opsi_jawaban);
        const opsiFormatted = rawOpsi.map((item, index) => ({
          label: item,
          value: index.toString(),
          score: item.toLowerCase() === 'ya' ? 1 : 0,
        }));

        setCurrentQuestion({
          ...data.nextQuestion,
          opsi_jawaban: opsiFormatted,
        });
      } else {
        setCurrentQuestion(data.nextQuestion);
      }

      setProgress(data.progress);
      setSelectedAnswer('');
    }
  } catch (e) {
    setError(e.message);
  } finally {
    setSubmitting(false);
  }
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

  if (error) {
    return (
      <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <Card className="shadow-lg border-0" style={{ maxWidth: '400px' }}>
          <Card.Body className="text-center p-5">
            <FaExclamationTriangle size={48} className="text-danger mb-3" />
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
            <Button
              variant="primary"
              onClick={() => window.location.reload()}
              className="px-4"
            >
              Coba Lagi
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
return (
  <div className="min-vh-100 d-flex flex-column">
    <NavbarComponent />
    <main className="flex-grow-1">
      {!started ? (
        <Container>
          <Row className="justify-content-center mb-4 mt-4">
            <Col>
              <Card className="shadow-sm border-0 overflow-hidden">
                <div className="bg-gradient text-white p-4 text-center">
                  {/* <FaHeartbeat size={48} className="mb-3" /> */}
                  <h2 className="mb-3 fw-bold">{cekKesehatanDetail?.judul_name}</h2>
                  <p className="lead text-white">
                      {cekKesehatanDetail?.deskripsi}
                    </p>
                </div>

                <Card.Body className="p-5">
                  <div className="mb-4">
                    {/* <Button
                        variant="outline-primary"
                        onClick={() => navigate(-1)}
                        className="mb-2 d-flex align-items-center"
                        style={{ width: 'fit-content' }}
                    >
                        <FaChevronLeft className="me-2" /> Kembali
                    </Button> */}
                    <Alert variant="info" className="border-0">
                      <FaClipboardCheck className="me-2" />
                      <strong>Informasi:</strong> Tes ini akan membantu menilai kondisi kesehatan Anda melalui serangkaian pertanyaan yang telah dirancang khusus.
                    </Alert>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={startSession}
                      className="px-4 fw-semibold">
                      Mulai Pemeriksaan
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : completed && result ? (
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
                  <p className="mb-0 opacity-75">{cekKesehatanDetail?.judul_name}</p>
                </div>

                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <Badge
                      bg={getRiskVariant(result.level_risiko)}
                      className="px-4 py-2 fs-6 mb-3"
                      style={{ borderRadius: '20px' }}
                    >
                      {getRiskIcon(result.level_risiko)}
                      Risiko {result.level_risiko?.toUpperCase()}
                    </Badge>
                  </div>

                  <Card className={`border-${getRiskVariant(result.level_risiko)} mb-4`}>
                    <Card.Body>
                      <h4 className={`text-${getRiskVariant(result.level_risiko)} fw-bold mb-3`}>
                        {result.judul_hasil}
                      </h4>
                      <p className="mb-0 text-muted">
                        {result.deskripsi_hasil}
                      </p>
                    </Card.Body>
                  </Card>

                  {result.saran && (
                    <Alert variant="primary" className="border-0 shadow-sm">
                      <Alert.Heading className="h6 fw-bold">
                        <FaClipboardCheck className="me-2" />
                        Rekomendasi untuk Anda:
                      </Alert.Heading>
                      <p className="mb-0">{result.saran}</p>
                    </Alert>
                  )}

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
      ) : (
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
                        {progress.current} / {progress.total}
                      </Badge>
                    </div>
                    <ProgressBar
                      now={(progress.current / progress.total) * 100}
                      variant="info"
                      style={{ height: '8px', borderRadius: '4px' }}
                      className="mb-0"
                    />
                  </div>

                  <Card.Body className="p-5">
                    <div className="mb-3">
                      <h4 className="fw-bold text-dark mb-4 lh-base">
                        {currentQuestion?.pertanyaan}
                      </h4>
                    </div>

                    <Form className="mb-4 shadow-none">
                      {Array.isArray(currentQuestion?.opsi_jawaban) && currentQuestion.opsi_jawaban.length > 0 ? (
                        <div className="d-grid gap-1">
                          {currentQuestion.opsi_jawaban.map(option => (
                            <Card
                              key={option.value}
                              className={`border-2 ${
                                selectedAnswer === option.value
                                  ? 'border-primary bg-primary bg-opacity-10'
                                  : 'border-light-subtle'
                              }`}
                              style={{
                                cursor: 'pointer',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease'
                              }}
                              onClick={() => setSelectedAnswer(option.value)}
                            >
                              <Card.Body className="p-4">
                                <Form.Check
                                  type="radio"
                                  id={`option-${option.value}`}
                                  name="answer"
                                  value={option.value}
                                  checked={selectedAnswer === option.value}
                                  onChange={() => setSelectedAnswer(option.value)}
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
                                    {option.label}
                                  </Form.Check.Label>
                                </Form.Check>
                              </Card.Body>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Alert variant="warning">
                          <FaExclamationTriangle className="me-2" />
                          Tidak ada opsi jawaban yang tersedia.
                        </Alert>
                      )}
                    </Form>

                    <div className="text-center">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleAnswerSubmit}
                        disabled={submitting || !selectedAnswer}
                        className="px-4 fw-semibold">
                        {submitting ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <FaClipboardCheck className="me-2" />
                            Kirim Jawaban
                          </>
                        )}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </main>
    <FooterComponent />
  </div>
);
};

export default CekKesehatan;