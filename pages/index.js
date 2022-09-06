import React, { useState } from "react";
import Image from "next/image";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import Page from "../components/Page";
import Products from "../components/Products";
import pages from "../data/pages.json";
import products from "../data/products.json";

const Index = ({ pages, products }) => {
  const [errorForm, setErrorForm] = useState(false);
  const [successForm, setSuccessForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  const newsletterChange = () => {
    setNewsletter(!newsletter);
  };

  const submitForm = async () => {
    console.log("-- Form contact --");
    console.log("Name", name);
    console.log("Email", email);
    console.log("Phone", phone);
    console.log("Body", body);
    console.log("Newsletter", newsletter);
    if (name === "" || email === "" || phone === "" || body === "") {
      setErrorForm(true);
      setSuccessForm(false);
    } else {
      setErrorForm(false);
      setIsLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, body, newsletter }),
      })
        .then((res) => res.json())
        .then(async (resData) => {
          if (resData.message) {
            setIsLoading(false);
            setErrorForm(false);
            setName("");
            setEmail("");
            setPhone("");
            setBody("");
            await capi("Contact", path);
            router.push("/obrigado");
          }
          if (resData.error === "Invalid input.") {
            setIsLoading(false);
            if (resData.data[0].message === "Name cannot be null.") {
              setErrorForm(true);
              setSuccessForm(false);
              setMessage("Preencha o nome.");
            } else if (resData.data[0].message === "Email is invalid.") {
              setErrorForm(true);
              setSuccessForm(false);
              setMessage("Endereço de email inválido.");
            } else if (resData.data[0].message === "Phone cannot be null.") {
              setErrorForm(true);
              setSuccessForm(false);
              setMessage("Favor preencher o telefone.");
            }
          }
        })
        .catch((err) => {
          console.log("err", err);
          setErrorForm(true);
          setSuccessForm(false);
          setIsLoading(false);
          setMessage(
            "Erro ao enviar formulário, verifique todos os campos e tente novamente."
          );
        });
    }
  };

  return (
    <Page
      title={pages[0].title}
      description={pages[0].description}
      capi="ViewContent"
    >
      <div id="produtos">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">
                <Products products={products} />
              </h2>
            </Col>
          </Row>
        </Container>
      </div>
      <div id="quemsomos">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">{pages[1].title}</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={8}>
              <div dangerouslySetInnerHTML={{ __html: pages[1].body }} />
            </Col>
            <Col md={12} lg={4}>
              <Image
                src={`/images/${pages[1].image.file}`}
                width={pages[1].image.width}
                height={pages[1].image.height}
                alt={process.env.NEXT_PUBLIC_COMPANY}
                title={process.env.NEXT_PUBLIC_COMPANY}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div id="oquefazemos">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">{pages[2].title}</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={4}>
              <Image
                src={`/images/${pages[2].image.file}`}
                width={pages[2].image.width}
                height={pages[2].image.height}
                alt={process.env.NEXT_PUBLIC_COMPANY}
                title={process.env.NEXT_PUBLIC_COMPANY}
              />
            </Col>
            <Col md={12} lg={8}>
              <div dangerouslySetInnerHTML={{ __html: pages[2].body }} />
            </Col>
          </Row>
        </Container>
      </div>
      <div id="contato">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">{pages[3].title}</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={6}>
              <Image
                src={`/images/${pages[3].image.file}`}
                width={pages[3].image.width}
                height={pages[3].image.height}
                alt={process.env.NEXT_PUBLIC_COMPANY}
                title={process.env.NEXT_PUBLIC_COMPANY}
              />
            </Col>
            <Col md={12} lg={6}>
              <Form>
                <Form.Group>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>WhatsApp / telefone</Form.Label>
                  <Form.Control
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    checked={newsletter}
                    onChange={() => newsletterChange()}
                    label="Desejo receber dicas e novidades"
                  />
                </Form.Group>
                <Form.Group>
                  {isLoading ? (
                    <Spinner animation="border" variant="primary" />
                  ) : (
                    <Button variant="primary" onClick={() => submitForm()}>
                      Enviar
                    </Button>
                  )}
                </Form.Group>
                <Alert variant="success" show={successForm}>
                  Formulário enviado com sucesso!
                </Alert>
                <Alert variant="danger" show={errorForm}>
                  {message}
                </Alert>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Page>
  );
};

export default Index;

export const getStaticProps = async () => {
  return {
    props: {
      pages,
      products,
    },
    revalidate: 60 * 60 * 24,
  };
};
