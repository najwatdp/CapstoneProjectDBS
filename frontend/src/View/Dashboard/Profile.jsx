import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Form, Alert, Nav } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLock, FaEdit, FaSave, FaImage } from 'react-icons/fa';
import ProfilePresenter from '../../Presenter/ProfilePresenter';
import Users from '../../Model/users';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profileInfo');
  const [isEditing, setIsEditing] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [data, setData] = useState(null);


  const presenter = new ProfilePresenter({
    model: Users,
    view: {
      setData: setData
    }
  })
  
  // Data statis untuk profil pengguna
  const [profileData, setProfileData] = useState({
    id: 'USR-123456',
    name: 'Admin Kesehatan',
    email: 'admin@healthapp.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Kesehatan No. 123, Jakarta Selatan',
    role: 'Admin',
    joinDate: '10 Januari 2023',
    lastLogin: '15 Mei 2025, 08:30 WIB',
    avatar: '/api/placeholder/150/150'
  });

  // Data statis untuk riwayat aktivitas
  const activityHistory = [
    { id: 1, activity: 'Memperbarui Artikel "Tips Hidup Sehat"', date: '14 Mei 2025, 14:30 WIB' },
    { id: 2, activity: 'Menambah Kategori "Kesehatan Mental"', date: '12 Mei 2025, 10:15 WIB' },
    { id: 3, activity: 'Mengubah pengaturan notifikasi', date: '10 Mei 2025, 16:45 WIB' },
    { id: 4, activity: 'Menambahkan user baru "dr. Santi"', date: '09 Mei 2025, 11:20 WIB' },
    { id: 5, activity: 'Login ke sistem', date: '09 Mei 2025, 08:00 WIB' }
  ];

  // Form data untuk edit profil
  const [formData, setFormData] = useState({
    name: profileData.name,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setProfileData({
      ...profileData,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address
    });
    setIsEditing(false);
    setSuccessAlert(true);
    setTimeout(() => setSuccessAlert(false), 3000);
  };

  // Data statis untuk password
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Logika untuk mengganti password akan ditambahkan nanti
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setSuccessAlert(true);
    setTimeout(() => setSuccessAlert(false), 3000);
  };


  return (
    <Container fluid className="p-4">
      <h1 className="mb-4">Profil Pengguna</h1>
      
      {successAlert && (
        <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
          Data berhasil disimpan!
        </Alert>
      )}

      <Row>
        <Col lg={3} md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <div className="position-relative mb-3 mx-auto" style={{ width: '150px', height: '150px' }}>
                <img
                  src={profileData.avatar}
                  alt="Profile"
                  className="rounded-circle img-fluid border"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
                <Button
                  variant="light"
                  size="sm"
                  className="position-absolute bottom-0 end-0 rounded-circle"
                  style={{ width: '40px', height: '40px' }}
                >
                  <FaImage />
                </Button>
              </div>
              <h4 className="mb-1">{profileData.name}</h4>
              <p className="text-muted mb-3">{profileData.role}</p>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" onClick={handleEditToggle}>
                  {isEditing ? <><FaSave className="me-2" /> Simpan</> : <><FaEdit className="me-2" /> Edit Profil</>}
                </Button>
              </div>
            </Card.Body>
            <Card.Footer className="bg-light">
              <small className="text-muted">ID: {profileData.id}</small><br />
              <small className="text-muted">Bergabung: {profileData.joinDate}</small><br />
              <small className="text-muted">Login terakhir: {profileData.lastLogin}</small>
            </Card.Footer>
          </Card>
        </Col>
        
        <Col lg={9} md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <Nav variant="tabs" defaultActiveKey="profileInfo">
                <Nav.Item>
                  <Nav.Link 
                    eventKey="profileInfo" 
                    onClick={() => setActiveTab('profileInfo')}
                    className={activeTab === 'profileInfo' ? 'active' : ''}
                  >
                    Informasi Profil
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="password" 
                    onClick={() => setActiveTab('password')}
                    className={activeTab === 'password' ? 'active' : ''}
                  >
                    Ubah Password
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    eventKey="activity" 
                    onClick={() => setActiveTab('activity')}
                    className={activeTab === 'activity' ? 'active' : ''}
                  >
                    Riwayat Aktivitas
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            
            <Card.Body>
              {activeTab === 'profileInfo' && (
                <Form>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaUser className="me-2" />
                          Nama
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={isEditing ? formData.name : profileData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaEnvelope className="me-2" />
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={isEditing ? formData.email : profileData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaPhone className="me-2" />
                          Nomor Telepon
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={isEditing ? formData.phone : profileData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaMapMarkerAlt className="me-2" />
                          Alamat
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={isEditing ? formData.address : profileData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  {isEditing && (
                    <div className="d-flex justify-content-end">
                      <Button variant="secondary" className="me-2" onClick={handleEditToggle}>
                        Batal
                      </Button>
                      <Button variant="primary" onClick={handleSaveProfile}>
                        Simpan Perubahan
                      </Button>
                    </div>
                  )}
                </Form>
              )}
              
              {activeTab === 'password' && (
                <Form onSubmit={handlePasswordSubmit}>
                  <Row className="justify-content-center">
                    <Col md={8}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaLock className="me-2" />
                          Password Saat Ini
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaLock className="me-2" />
                          Password Baru
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                        <Form.Text className="text-muted">
                          Password minimal 8 karakter dengan kombinasi huruf dan angka.
                        </Form.Text>
                      </Form.Group>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <FaLock className="me-2" />
                          Konfirmasi Password Baru
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </Form.Group>
                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Ubah Password
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
              
              {activeTab === 'activity' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Aktivitas</th>
                        <th>Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityHistory.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.activity}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;