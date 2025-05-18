import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Pagination } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaUserPlus, FaFilter } from 'react-icons/fa';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data statis untuk daftar user
  const users = [
    { id: 1, name: 'Ahmad Fauzi', email: 'ahmad@example.com', role: 'Admin', status: 'Aktif', lastLogin: '14 Mei 2025 09:25' },
    { id: 2, name: 'Budi Santoso', email: 'budi@example.com', role: 'Editor', status: 'Aktif', lastLogin: '13 Mei 2025 14:30' },
    { id: 3, name: 'Cindy Permata', email: 'cindy@example.com', role: 'Kontributor', status: 'Tidak Aktif', lastLogin: '10 Mei 2025 08:15' },
    { id: 4, name: 'Doni Pratama', email: 'doni@example.com', role: 'Admin', status: 'Aktif', lastLogin: '14 Mei 2025 07:45' },
    { id: 5, name: 'Eva Sari', email: 'eva@example.com', role: 'Editor', status: 'Aktif', lastLogin: '12 Mei 2025 16:20' },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Manajemen User</h2>
          <Card>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Cari user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Select>
                    <option value="">Filter Role</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="contributor">Kontributor</option>
                  </Form.Select>
                </Col>
                <Col md={3} className="text-end">
                  <Button variant="primary" href="/dashboard/users/create">
                    <FaUserPlus className="me-2" /> Tambah User
                  </Button>
                </Col>
              </Row>
              
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Login Terakhir</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Badge bg={user.status === 'Aktif' ? 'success' : 'danger'}>
                          {user.status}
                        </Badge>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-1">
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
              
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>Menampilkan 1-5 dari 5 entries</div>
                <Pagination>
                  <Pagination.Prev disabled />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Next disabled />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;