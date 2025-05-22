import React, { useEffect, useState } from 'react';
import { Row, Col, Button, ProgressBar, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaCog, FaUser, FaHome } from "react-icons/fa";
import { 
  FaUserPlus, FaNewspaper, FaEye, FaDownload, 
  FaChartLine, FaChartArea, FaChartPie, FaCalendarAlt,  
} from 'react-icons/fa';
import '../Dashboard/layouts/MainLayout.css';
import '../Dashboard/Dashboard.css';
import DashboardPresenter from '../../Presenter/DashboardPresenter';
import Model from '../../Model/Model';

const Dashboard = () => {

  const [users, setUsers] = useState(null);
  const date = new Date;

  const presenter = new DashboardPresenter({
    model: Model,
    view: {
      setUsers: setUsers
    }
  });
  useEffect(() => {
    presenter.getUser();
  }, []);


  return (
    <div className="dashboard-container">
      <div className="page-header mb-4">
        <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Ringkasan data dan statistik utama untuk memantau kinerja sistem secara real-time.</p>
        {/* <Button variant="primary">
          <FaDownload className="me-2" /> Unduh Laporan
        </Button> */}
      </div>

      {/* Statistic Cards */}
      <Row>
        <Col lg={3} md={6} className="mb-4">
          <Card className="border-left-primary h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold'}} className="text-primary text-uppercase mb-1">
                    Total Pengguna
                  </div>
                  <div className="h5 mb-0 font-weight-bold">{ users !== null ? users.length : 0 }</div>
                  <div className="mt-2 small">
                    <span className="text-success me-2">+12%</span>
                    <span className="text-muted">sejak bulan lalu</span>
                  </div>
                  { users !== null ? users[0].createdAt : 0 }
                  <div>
                    { date }
                  </div>
                </Col>
                <Col xs="auto">
                  <FaUserPlus style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className=" border-left-success h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold'}} className=" text-success text-uppercase mb-1">
                    Artikel Diterbitkan
                  </div>
                  <div className="h5 mb-0 font-weight-bold">#</div>
                  <div className="mt-2 small">
                    <span className="text-success me-2">+5%</span>
                    <span className="text-muted">sejak bulan lalu</span>
                  </div>
                </Col>
                <Col xs="auto">
                  <FaNewspaper  style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="border-left-info h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold'}} className=" text-info text-uppercase mb-1">
                    Total Kunjungan
                  </div>
                  <div className="h5 mb-0 font-weight-bold">#</div>
                  <div className="mt-2 small">
                    <span className="text-success me-2">+18%</span>
                    <span className="text-muted">sejak bulan lalu</span>
                  </div>
                </Col>
                <Col xs="auto">
                  <FaUser style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-4">
          <Card className="border-left-warning h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold'}} className="text-warning text-uppercase mb-1">
                    Target Bulanan
                  </div>
                  <div className="mb-0 font-weight-bold">#%</div>
                  <ProgressBar now={75} variant="warning" className="mt-2" />
                  <div className="mt-2 small text-muted">
                    Target 2,000 pengunjung baru
                  </div>
                </Col>
                <Col xs="auto">
                  <FaChartLine style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Analytics Charts */}
      <Row>
        <Col xl={8} lg={7}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Statistik Kunjungan</h6>
              <div className="dropdown">
                <Button variant="light" size="sm">
                  <FaCalendarAlt className="me-1" /> Bulan Ini
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="chart-area">
                <div className="chart-placeholder d-flex align-items-center justify-content-center" style={{ height: '320px', background: '#f8f9fc' }}>
                  <div className="text-center">
                    <FaChartArea style={{ fontSize: '3rem', color: '#dddfeb' }} />
                    <p className="mt-2 text-muted">Area Chart - Statistik Kunjungan</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col xl={4} lg={5}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Distribusi Artikel</h6>
              <div className="dropdown">
                <Button variant="light" size="sm">
                  <FaCalendarAlt className="me-1" /> Tahun Ini
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="chart-pie mb-4">
                <div className="chart-placeholder d-flex align-items-center justify-content-center" style={{ height: '260px', background: '#f8f9fc' }}>
                  <div className="text-center">
                    <FaChartPie style={{ fontSize: '3rem', color: '#dddfeb' }} />
                    <p className="mt-2 text-muted">Pie Chart - Distribusi Artikel</p>
                  </div>
                </div>
              </div>
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#4e73df' }}></div>
                  <span>Kesehatan Umum (35%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#1cc88a' }}></div>
                  <span>Nutrisi (25%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#36b9cc' }}></div>
                  <span>Olahraga (20%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#f6c23e' }}></div>
                  <span>Kesehatan Mental (15%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#e74a3b' }}></div>
                  <span>Lainnya (5%)</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Content and Activities */}
      <Row>
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Artikel Terbaru</h6>
              <Button variant="primary" size="sm">Lihat Semua</Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="recent-articles">
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Kategori</th>
                    <th>Penulis</th>
                    <th>Status</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10 Tips Menjaga Kesehatan Jantung</td>
                    <td>Kesehatan Umum</td>
                    <td>Dr. Andi</td>
                    <td><span className="badge bg-success">Diterbitkan</span></td>
                    <td>12/05/2025</td>
                  </tr>
                  <tr>
                    <td>Manfaat Olahraga Pagi untuk Kesehatan</td>
                    <td>Olahraga</td>
                    <td>Budi S.</td>
                    <td><span className="badge bg-success">Diterbitkan</span></td>
                    <td>10/05/2025</td>
                  </tr>
                  <tr>
                    <td>5 Makanan untuk Meningkatkan Daya Tahan Tubuh</td>
                    <td>Nutrisi</td>
                    <td>Dr. Citra</td>
                    <td><span className="badge bg-warning">Menunggu</span></td>
                    <td>09/05/2025</td>
                  </tr>
                  <tr>
                    <td>Cara Mengatasi Stres di Tempat Kerja</td>
                    <td>Kesehatan Mental</td>
                    <td>Dr. Dewi</td>
                    <td><span className="badge bg-warning">Menunggu</span></td>
                    <td>08/05/2025</td>
                  </tr>
                  <tr>
                    <td>Pentingnya Vaksinasi untuk Anak</td>
                    <td>Kesehatan Umum</td>
                    <td>Dr. Eko</td>
                    <td><span className="badge bg-danger">Draft</span></td>
                    <td>05/05/2025</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Aktivitas Terbaru</h6>
              <Button variant="primary" size="sm">Lihat Semua</Button>
            </Card.Header>
            <Card.Body>
              <div className="activity-timeline">
                <div className="activity-item">
                  <div className="activity-icon bg-primary">
                    <FaUserPlus />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Pengguna Baru Terdaftar</div>
                    <p>Rahman S. telah mendaftar sebagai pengguna baru</p>
                    <div className="activity-time">2 jam yang lalu</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-success">
                    <FaNewspaper />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Artikel Diterbitkan</div>
                    <p>Dr. Andi menerbitkan artikel "10 Tips Menjaga Kesehatan Jantung"</p>
                    <div className="activity-time">4 jam yang lalu</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-info">
                    <FaEye />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Lonjakan Kunjungan</div>
                    <p>Artikel "Manfaat Olahraga Pagi untuk Kesehatan" dikunjungi 500+ kali</p>
                    <div className="activity-time">Kemarin, 14:23</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-warning">
                    <FaCog />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Pengaturan Diperbarui</div>
                    <p>Admin telah memperbarui pengaturan notifikasi sistem</p>
                    <div className="activity-time">Kemarin, 09:10</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-danger">
                    <FaUserPlus />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Penulis Baru Ditambahkan</div>
                    <p>Dr. Dewi telah ditambahkan sebagai penulis dengan spesialisasi Kesehatan Mental</p>
                    <div className="activity-time">3 hari yang lalu</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;