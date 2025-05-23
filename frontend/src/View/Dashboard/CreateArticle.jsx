import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ArticlePresenter from '../../Presenter/ArticlePresenter';
import Dashboard from '../../Model/modelDashboard';
import { useState } from 'react';
import { useLocation } from 'react-router';

const CreateArticle = () => {

  const [Loading, setLoading] = useState();
  const [judul, setJudul] = useState(null);
  const [isi, setIsi] = useState(null);
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState(null);
  const [author, setAuthor] = useState(null);
  const [kategori, setKategori] = useState(null);
  const [kategoris, setKategoris] = useState(null);
  const location = useLocation();
  const getArticle = location.state || null;
  const [editId, setEditId] = useState(getArticle !== null ? getArticle.id : null);

  const presenter = new ArticlePresenter({
    model: Dashboard,
    view: {
      setLoading: setLoading,
      setKategoris: setKategoris
    }
  });

  async function submit(e) {
    e.preventDefault();
    if (editId !== null) {
      await presenter.updateArticle(editId, judul, isi, images, status, author, kategori, getArticle);
      setEditId(null);
      return;
    }
    await presenter.createArticle(judul, isi, images, status, author, kategori);
  }

  useEffect(() => {
    presenter.getKategori();
  }, []);
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Tambah Artikel Baru</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Judul Artikel</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan judul artikel" defaultValue={getArticle !== null ? getArticle.judul : null} onChange={(e) => setJudul(e.target.value)} required/>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Kategori</Form.Label>
                      <Form.Select onChange={(e) => setKategori(e.target.value)} required>
                        {getArticle !== null ? getArticle.kategori_id : null}
                        <option value="">Pilih Kategori</option>
                        { kategoris !== null ? kategoris.map(value => (
                          <option value={ value.id } key={value.id}>{ value.nama_kategori }</option>
                        )) : <></> }
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Author</Form.Label>
                      <Form.Control type="text" placeholder="Tag1, Tag2, Tag3" defaultValue={getArticle !== null ? getArticle.author : null} onChange={(e) => setAuthor(e.target.value)} required/>
                      <Form.Text className="text-muted">
                        Pisahkan tag dengan koma
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Upload Thumbnail</Form.Label>
                  <Form.Control type="file" onChange={(e) => setImages(e.target.files[0])} required/>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Deskripsi Singkat</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Masukkan deskripsi singkat tentang artikel ini"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Konten Artikel</Form.Label>
                  <div className="editor-container border rounded p-2">
                    {/* Catatan: CKEditor memerlukan instalasi, sebagai alternatif bisa menggunakan <textarea> */}
                    <Form.Control 
                      as="textarea" 
                      rows={10} 
                      onChange={(e) => setIsi(e.target.value)}
                      defaultValue={getArticle !== null ? getArticle.isi : null}
                      placeholder="Tulis konten artikel di sini..."
                      required
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
                      <Form.Select onChange={(e) =>  setStatus(e.target.value)}>
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