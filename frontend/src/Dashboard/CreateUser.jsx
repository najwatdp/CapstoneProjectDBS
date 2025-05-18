import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';

const CreateUser = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Tambah User Baru</h2>
          <Card>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control type="text" placeholder="Masukkan nama lengkap" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Masukkan email" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Masukkan password" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Konfirmasi Password</Form.Label>
                      <Form.Control type="password" placeholder="Konfirmasi password" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Select>
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="contributor">Kontributor</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select>
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Upload Foto Profil</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                
                <div className="mt-4 d-flex justify-content-end">
                  <Button variant="secondary" className="me-2">
                    <FaTimes className="me-1" /> Batal
                  </Button>
                  <Button variant="primary" type="submit">
                    <FaSave className="me-1" /> Simpan
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;