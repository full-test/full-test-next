import { useState } from "react";
import Image from "next/image";
import { Row, Col, Button, Modal } from "react-bootstrap";

const Products = (props) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(-1);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id, title, body) => {
    setShow(true);
    setId(id);
    setTitle(title);
    setBody(body);
  };

  return (
    <>
      <Row>
        {props.products.map((product) => (
          <Col
            key={props.id}
            xs={6}
            sm={6}
            md={6}
            lg={4}
            className="text-center"
          >
            <h4>{product.title}</h4>
            <p>
              <Image
                onClick={() =>
                  handleShow(product.id, product.title, product.body)
                }
                src={`/images/products/${product.id}.jpg`}
                width={512}
                height={512}
                alt={product.title}
                title={product.title}
              />
            </p>
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={3}>
              <Image
                src={`/images/products/${id}.jpg`}
                width={512}
                height={512}
                alt={title}
                title={title}
              />
            </Col>
            <Col sm={12} md={9}>
              <div dangerouslySetInnerHTML={{ __html: body }} />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Products;
