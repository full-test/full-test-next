import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Navbar, Nav, Container, Alert, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import capi from "../util/capi";

const Page = (props) => {
  const router = useRouter();
  const path = `${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`;
  const applyCapi = async () => {
    await capi(props.capi || "PageView", path);
  };
  useEffect(() => {
    applyCapi();
  }, []);
  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={process.env.NEXT_PUBLIC_THEME_COLOR}
        />
        <title>{props.title}</title>
        <meta name="title" content={props.title} />
        <meta name="description" content={props.description} />
        <meta
          name="keywords"
          content={
            props.keywords || `${props.title.toLowerCase()}, fulltest, full`
          }
        />
        <meta
          name="robots"
          content={`${props.index || "index"}, ${props.follow || "follow"}`}
        />
        <meta name="author" content="www.clicksolucoesweb.com.br" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:url" content={path} />
        <meta property="og:site_name" content="Full Test" />
        {/* <meta
          property="article:publisher"
          content="https://www.facebook.com/..."
        /> */}
        <meta
          property="og:image"
          content={props.image || "/images/full-test-512.png"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        sticky="top"
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <Link href="/">
            <Navbar.Brand as="a" href="/">
              <Image
                src="/images/full-test.svg"
                height={130}
                width={200}
                alt={process.env.NEXT_PUBLIC_COMPANY}
                title={process.env.NEXT_PUBLIC_COMPANY}
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link href="#produtos">
                <Nav.Link
                  as="a"
                  href="#produtos"
                  className={router.pathname == "/produtos" ? "active" : ""}
                >
                  Produtos
                </Nav.Link>
              </Link>
              <Link href="#quemsomos">
                <Nav.Link
                  as="a"
                  href="#quemsomos"
                  className={router.pathname == "/quemsomos" ? "active" : ""}
                >
                  Quem Somos
                </Nav.Link>
              </Link>
              <Link href="#oquefazemos">
                <Nav.Link
                  as="a"
                  href="#oquefazemos"
                  className={
                    router.pathname.includes("/oquefazemos") ? "active" : ""
                  }
                >
                  O que fazemos
                </Nav.Link>
              </Link>
              <Link href="#contato">
                <Nav.Link
                  as="a"
                  href="#contato"
                  className={router.pathname == "/contato" ? "active" : ""}
                >
                  Contato
                </Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <Nav.Link href="#" target="_blank">
                <FaInstagram size={25} />
              </Nav.Link>
              <Nav.Link href="#" target="_blank">
                <FaFacebookF size={25} />
              </Nav.Link>
              <Nav.Link href="https://wa.me/5531991949825" target="_blank">
                <FaWhatsapp size={25} />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
      <div className="copyright">
        <div className="container">
          <div className="row">
            <div className="col text-truncate">
              <p>
                2015 / {new Date().getFullYear()} - Full Test &nbsp;- Todos os
                Direitos Reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
