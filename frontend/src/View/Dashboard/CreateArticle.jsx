import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateArticle = () => {
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Tambah Artikel Baru</h2>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Judul Artikel</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan judul artikel" />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Kategori</Form.Label>
                      <Form.Select>
                        <option value="">Pilih Kategori</option>
                        <option value="jantung">Kesehatan Jantung</option>
                        <option value="anak">Kesehatan Anak</option>
                        <option value="nutrisi">Nutrisi</option>
                        <option value="kronis">Penyakit Kronis</option>
                        <option value="mental">Kesehatan Mental</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tags</Form.Label>
                      <Form.Control type="text" placeholder="Tag1, Tag2, Tag3" />
                      <Form.Text className="text-muted">
                        Pisahkan tag dengan koma
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Upload Thumbnail</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Deskripsi Singkat</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Masukkan deskripsi singkat tentang artikel ini"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Konten Artikel</Form.Label>
                  <div className="editor-container border rounded p-2">
                    {/* Catatan: CKEditor memerlukan instalasi, sebagai alternatif bisa menggunakan <textarea> */}
                    <Form.Control 
                      as="textarea" 
                      rows={10} 
                      placeholder="Tulis konten artikel di sini..."
                    />
                    {/* Alternatif dengan CKEditor:
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ data });
                      }}
                    /> */}
                  </div>
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="review">Review</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tanggal Publikasi</Form.Label>
                      <Form.Control type="datetime-local" />
                    </Form.Group>
                  </Col>
                </Row>
                
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

export default CreateArticle;