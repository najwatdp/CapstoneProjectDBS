import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Tambah Kategori');
  const [editId, setEditId] = useState(null);
  
  // Data statis untuk kategori
  const categories = [
    { id: 1, name: 'Kesehatan Jantung', articles: 15, created: '02 Jan 2025' },
    { id: 2, name: 'Kesehatan Anak', articles: 12, created: '15 Jan 2025' },
    { id: 3, name: 'Nutrisi', articles: 18, created: '10 Feb 2025' },
    { id: 4, name: 'Penyakit Kronis', articles: 8, created: '20 Feb 2025' },
    { id: 5, name: 'Kesehatan Mental', articles: 10, created: '05 Mar 2025' },
  ];

  const handleAddCategory = () => {
    setModalTitle('Tambah Kategori');
    setEditId(null);
    setShowModal(true);
  };

  const handleEditCategory = (id) => {
    setModalTitle('Edit Kategori');
    setEditId(id);
    setShowModal(true);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Kategori Artikel</h2>
            <Button variant="primary" onClick={handleAddCategory}>
              <FaPlus className="me-2" /> Tambah Kategori
            </Button>
          </div>
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama Kategori</th>
                    <th>Jumlah Artikel</th>
                    <th>Tanggal Dibuat</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(category => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>{category.articles}</td>
                      <td>{category.created}</td>
                      <td>
                        <Button 
                          variant="warning" 
                          size="sm" 
                          className="me-1"
                          onClick={() => handleEditCategory(category.id)}
                        >
                          <FaEdit />
                        </Button>
                        <Button variant="danger" size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Tambah/Edit Kategori */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Masukkan nama kategori"
                defaultValue={editId ? categories.find(c => c.id === editId)?.name : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                placeholder="Deskripsi kategori (opsional)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary">
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Categories;