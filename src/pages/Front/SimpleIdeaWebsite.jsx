import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Carousel,
} from "react-bootstrap";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image8 from "../../assets/image8.png";
import image9 from "../../assets/image9.png";
import image11 from "../../assets/image11.jpg";
import image5 from "../../assets/image5.jpg";
import image6 from "../../assets/image6.jpg";
import image7 from "../../assets/image7.jpg";
import avatar from "../../assets/avatar.png";

function SimpleIdeaWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Services data
  const services = [
    {
      id: 1,
      title: "Digital Printing",
      description:
        "High-quality digital printing services for all your business needs, from business cards to large format banners.",
      icon: "bi bi-printer-fill",
      image: image7,
    },
    {
      id: 2,
      title: "Branding",
      description:
        "Comprehensive branding services to establish a strong and recognizable identity that resonates with your target audience.",
      icon: "bi bi-bag-fill",
      image: image5,
    },
    {
      id: 3,
      title: "Logo Design",
      description:
        "Custom logo designs that capture the essence of your brand and make a lasting impression on your customers.",
      icon: "bi bi-brush-fill",
      image: image6,
    },
    {
      id: 4,
      title: "Web Design",
      description:
        "Modern, responsive web design services that ensure your digital presence matches your brand identity.",
      icon: "bi bi-laptop-fill",
      image: image11,
    },
  ];

  // Portfolio projects
  const portfolioItems = [
    {
      id: 1,
      title: "Urban Coffee Branding",
      category: "Branding",
      image: image3,
    },
    {
      id: 2,
      title: "Juice Bar Website",
      category: "Web Design",
      image: image1,
    },
    {
      id: 3,
      title: "Camping Arts",
      category: "Digital Printing",
      image: image2,
    },
  ];

  // Team members
  const teamMembers = [
    {
      id: 1,
      name: "Lahiru Gunathilake",
      role: "Creative Director",
      bio: "With over 15 years of experience in the design industry, Alex leads our creative team with vision and expertise.",
      image: avatar,
    },
    {
      id: 2,
      name: "Sandaru Gunathilake",
      role: "Web Developer",
      bio: "Sandaru is a skilled web developer with a passion for creating dynamic and responsive websites that provide excellent user experiences.",
      image: avatar,
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Web Designer",
      bio: "Michael combines technical expertise with design sensibility to create stunning and functional websites.",
      image: avatar,
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Print Specialist",
      bio: "Emma ensures the highest quality for all our print projects with her attention to detail and technical knowledge.",
      image: avatar,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      text: "Simple Idea transformed our brand identity with their exceptional design work. Our new logo and marketing materials have received countless compliments!",
      author: "Jane Smith, CEO of Bright Solutions",
    },
    {
      id: 2,
      text: "Working with the team at Simple Idea was a breeze. They understood our vision immediately and delivered designs that exceeded our expectations.",
      author: "Mark Johnson, Marketing Director at TechPro",
    },
    {
      id: 3,
      text: "The packaging design created by Simple Idea helped our product stand out on shelves and increased our sales by 40% in just three months!",
      author: "Lisa Chen, Founder of Eco Essentials",
    },
  ];

  // Content for different tabs
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            {/* Hero Section */}
            <section className="bg-black text-white py-5">
              <Container>
                <Row className="align-items-center py-5">
                  <Col lg={6} className="mb-4 mb-lg-0">
                    <h1 className="display-4 fw-bold mb-4">
                      Bringing Your <span className="text-primary">Ideas</span>{" "}
                      <br/>
                      to Life
                    </h1>
                    <p className="lead mb-4">
                      We are Simple Idea, a full-service graphic design studio
                      dedicated to transforming your vision into powerful visual
                      communication.
                    </p>
                    <div className="d-flex gap-3">
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => setActiveTab("contact")}
                      >
                        Get Started
                      </Button>
                      <Button
                        variant="outline-light"
                        size="lg"
                        onClick={() => setActiveTab("portfolio")}
                      >
                        View Our Work
                      </Button>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="position-relative">
                      <img
                        src={image8}
                        alt="Creative Design Process"
                        className="img-fluid rounded shadow-lg"
                      />
                      <div className="position-absolute top-0 start-100 translate-middle bg-primary rounded-circle p-3 d-none d-lg-block">
                        <i className="bi bi-lightbulb-fill text-white fs-4"></i>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>

            {/* Featured Services */}
            <section className="py-5 bg-dark">
              <Container>
                <h2 className="text-center mb-5">Our Services</h2>
                <Row>
                  {services.slice(0, 3).map((service) => (
                    <Col key={service.id} md={4} className="mb-4">
                      <Card className="h-100 bg-dark text-white border-primary">
                        <Card.Img
                          variant="top"
                          src={service.image}
                          alt={service.title}
                        />
                        <Card.Body>
                          <div className="d-flex align-items-center mb-3">
                            <i
                              className={`${service.icon} text-primary fs-4 me-2`}
                            ></i>
                            <Card.Title className="mb-0">
                              {service.title}
                            </Card.Title>
                          </div>
                          <Card.Text>{service.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="bg-transparent border-0">
                          <Button
                            variant="outline-primary"
                            onClick={() => setActiveTab("services")}
                          >
                            Learn More
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setActiveTab("services")}
                  >
                    View All Services
                  </Button>
                </div>
              </Container>
            </section>

            <section className="py-5 bg-black">
              <Container>
                <h2 className="text-center mb-5">Recent Projects</h2>
                <Row>
                  {portfolioItems.slice(0, 3).map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                      <Card className="bg-dark text-white border-0">
                        <div
                          className="portfolio-item position-relative overflow-hidden"
                          style={{ maxHeight: "600px" }}
                        >
                          <Card.Img
                            variant="top"
                            src={item.image}
                            alt={item.title}
                            className="img-fluid"
                            style={{ objectFit: "cover", height: "600px" }}
                          />
                          <div className="portfolio-overlay d-flex align-items-center justify-content-center">
                            <div className="text-center p-3">
                              <h5>{item.title}</h5>
                              <p className="mb-0">{item.category}</p>
                              <Button
                                variant="light"
                                size="sm"
                                className="mt-2"
                              >
                                View Project
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <div className="text-center mt-4">
                  <Button
                    variant="outline-light"
                    size="lg"
                    onClick={() => setActiveTab("portfolio")}
                  >
                    View Full Portfolio
                  </Button>
                </div>
              </Container>
            </section>

            {/* Testimonials */}
            <section className="py-5 bg-dark">
              <Container>
                <h2 className="text-center mb-5">What Our Clients Say</h2>
                <Carousel indicators={false} className="testimonial-carousel">
                  {testimonials.map((testimonial) => (
                    <Carousel.Item key={testimonial.id}>
                      <div className="testimonial-item text-center p-4">
                        <i className="bi bi-quote display-3 text-primary opacity-25"></i>
                        <p className="lead mb-4">{testimonial.text}</p>
                        <p className="fw-bold mb-0">{testimonial.author}</p>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Container>
            </section>

            {/* CTA */}
            <section className="py-5 bg-primary">
              <Container className="text-center">
                <h2 className="mb-4">Ready to Bring Your Ideas to Life?</h2>
                <p className="lead mb-4">
                  Let's collaborate to create designs that make an impact.
                </p>
                <Button
                  variant="light"
                  size="lg"
                  onClick={() => setActiveTab("contact")}
                >
                  Contact Us Today
                </Button>
              </Container>
            </section>
          </>
        );

      case "about":
        return (
          <section className="py-5 bg-dark">
            <Container>
              <Row className="mb-5">
                <Col lg={6} className="mb-4 mb-lg-0">
                  <h2 className="display-5 mb-4">About Simple Idea</h2>
                  <p className="lead">
                    We are a creative graphic design studio passionate about
                    transforming ideas into visual experiences that matter.
                  </p>
                  <p>
                    Founded in 2016, Simple Idea has grown from a small design
                    studio to a comprehensive graphic design firm serving
                    clients across multiple industries. Our approach combines
                    creativity with strategic thinking to deliver designs that
                    not only look great but also achieve business objectives.
                  </p>
                  <p>
                    With our team of experienced designers, we offer a full
                    range of graphic design services, from branding and identity
                    design to digital printing solutions.
                  </p>
                  <div className="d-flex gap-3 mt-4">
                    <Button
                      variant="primary"
                      onClick={() => setActiveTab("services")}
                    >
                      Our Servicesm
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => setActiveTab("contact")}
                    >
                      Get in Touch
                    </Button>
                  </div>
                </Col>
                <Col lg={6}>
                  <img
                    src={image9}
                    alt="Simple Idea Studio"
                    className="img-fluid rounded shadow"
                  />
                </Col>
              </Row>

              <h3 className="text-center mb-5 mt-5">Our Values</h3>
              <Row className="text-center">
                <Col md={4} className="mb-4">
                  <div className="value-item p-4 bg-black rounded">
                    <div className="icon-box mb-3">
                      <i className="bi bi-lightbulb text-primary display-4"></i>
                    </div>
                    <h4>Creativity</h4>
                    <p>
                      We embrace creativity in every aspect of our work, pushing
                      boundaries to deliver unique design solutions.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="value-item p-4 bg-black rounded">
                    <div className="icon-box mb-3">
                      <i className="bi bi-people text-primary display-4"></i>
                    </div>
                    <h4>Collaboration</h4>
                    <p>
                      We believe in working closely with our clients, building
                      partnerships that lead to exceptional results.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="value-item p-4 bg-black rounded">
                    <div className="icon-box mb-3">
                      <i className="bi bi-arrow-up-right-circle text-primary display-4"></i>
                    </div>
                    <h4>Excellence</h4>
                    <p>
                      We are committed to excellence in every project,
                      maintaining the highest standards in all we do.
                    </p>
                  </div>
                </Col>
              </Row>

              <h3 className="text-center mb-5 mt-5">Our Team</h3>
              <Row>
                {teamMembers.map((member) => (
                  <Col key={member.id} lg={3} md={6} className="mb-4">
                    <Card className="team-card bg-dark text-white border-0">
                      <div className="position-relative">
                        <Card.Img
                          variant="top"
                          src={member.image}
                          alt={member.name}
                          className="img-fluid"
                          style={{
                            height: "300px",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                      </div>
                      <Card.Body className="text-center">
                        <h5 className="fw-bold mb-2">{member.name}</h5>
                        <div className="text-primary mb-3">{member.role}</div>
                        <Card.Text>{member.bio}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        );

      case "services":
        return (
          <section className="py-5 bg-dark">
            <Container>
              <h2 className="display-5 text-center mb-5">Our Services</h2>
              <p className="lead text-center mb-5">
                We offer a comprehensive range of graphic design services to
                help your business stand out.
              </p>

              <Row>
                {services.map((service) => (
                  <Col key={service.id} lg={6} className="mb-5">
                    <Card className="bg-dark text-white border-0 service-card">
                      <Row className="g-0">
                        <Col
                          md={6}
                          className="position-relative"
                          style={{ height: "300px" }}
                        >
                          <Card.Img
                            src={service.image}
                            alt={service.title}
                            className="img-fluid rounded-start"
                            style={{
                              height: "300px",
                              width: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        </Col>
                        <Col md={6}>
                          <Card.Body className="d-flex flex-column h-100">
                            <div className="mb-3">
                              <i
                                className={`${service.icon} text-primary fs-1 mb-3`}
                              ></i>
                              <Card.Title className="fs-3">
                                {service.title}
                              </Card.Title>
                            </div>
                            <Card.Text className="mb-4">
                              {service.description}
                            </Card.Text>
                            <Button
                              variant="outline-primary"
                              className="mt-auto align-self-start"
                            >
                              Learn More
                            </Button>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div className="process-section mt-5 pt-5">
                <h3 className="text-center mb-5">Our Design Process</h3>
                <Row>
                  <Col lg={3} md={6} className="mb-4">
                    <div className="process-step text-center">
                      <div className="process-icon mb-3">
                        <span
                          className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fs-4"
                          style={{ width: "80px", height: "80px" }}
                        >
                          1
                        </span>
                      </div>
                      <h4>Discovery</h4>
                      <p>
                        We start by understanding your brand, goals, and target
                        audience to create a strategic foundation.
                      </p>
                    </div>
                  </Col>
                  <Col lg={3} md={6} className="mb-4">
                    <div className="process-step text-center">
                      <div className="process-icon mb-3">
                        <span
                          className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fs-4"
                          style={{ width: "80px", height: "80px" }}
                        >
                          2
                        </span>
                      </div>
                      <h4>Concept</h4>
                      <p>
                        We develop creative concepts that align with your brand
                        identity and project objectives.
                      </p>
                    </div>
                  </Col>
                  <Col lg={3} md={6} className="mb-4">
                    <div className="process-step text-center">
                      <div className="process-icon mb-3">
                        <span
                          className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fs-4"
                          style={{ width: "80px", height: "80px" }}
                        >
                          3
                        </span>
                      </div>
                      <h4>Design</h4>
                      <p>
                        Our designers bring the concepts to life with attention
                        to detail and artistic excellence.
                      </p>
                    </div>
                  </Col>
                  <Col lg={3} md={6} className="mb-4">
                    <div className="process-step text-center">
                      <div className="process-icon mb-3">
                        <span
                          className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center fs-4"
                          style={{ width: "80px", height: "80px" }}
                        >
                          4
                        </span>
                      </div>
                      <h4>Delivery</h4>
                      <p>
                        We deliver the final designs and provide any necessary
                        support for implementation.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="cta-box bg-primary p-5 rounded text-center mt-5">
                <h3 className="mb-3">Ready to Start Your Project?</h3>
                <p className="lead mb-4">
                  Contact us today to discuss how we can bring your ideas to
                  life.
                </p>
                <Button
                  variant="light"
                  size="lg"
                  onClick={() => setActiveTab("contact")}
                >
                  Get a Free Quote
                </Button>
              </div>
            </Container>
          </section>
        );

      case "portfolio":
        return (
          <section className="py-5 bg-dark">
            <Container>
              <h2 className="display-5 text-center mb-5">Our Portfolio</h2>
              <p className="lead text-center mb-5">
                Explore our recent projects and see how we've helped businesses
                succeed through compelling design.
              </p>

              <div className="portfolio-filters text-center mb-5">
                <Button variant="outline-primary" className="me-2 mb-2 active">
                  All
                </Button>
                <Button variant="outline-primary" className="me-2 mb-2">
                  Branding
                </Button>
                <Button variant="outline-primary" className="me-2 mb-2">
                  Print Design
                </Button>
                <Button variant="outline-primary" className="me-2 mb-2">
                  Web Design
                </Button>
              </div>

              <Row className="g-4">
                {portfolioItems.map((item) => (
                  <Col key={item.id} lg={4} md={6} className="mb-4">
                    <Card className="portfolio-card bg-dark text-white border-0">
                      <div
                        className="portfolio-img-container position-relative overflow-hidden"
                        style={{ height: "600px" }}
                      >
                        <Card.Img
                          variant="top"
                          src={item.image}
                          alt={item.title}
                          style={{
                            height: "600px",
                            width: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                          }}
                        />
                        <div className="portfolio-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                          <div className="overlay-content text-center p-3">
                            <h4 className="mb-2">{item.title}</h4>
                            <p className="mb-3">{item.category}</p>
                            <Button variant="outline-light" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Card.Body>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text className="text-muted">
                          {item.category}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </section>
        );

      case "contact":
        return (
          <section className="py-5 bg-dark">
            <Container>
              <h2 className="display-5 text-center mb-5">Contact Us</h2>
              <p className="lead text-center mb-5">
                Ready to start your next project? Get in touch with us today!
              </p>

              <Row>
                <Col lg={6} className="mb-4 mb-lg-0">
                  <Card className="bg-black text-white h-100 border-0">
                    <Card.Body className="p-4">
                      <h3 className="mb-4">Get In Touch</h3>
                      <Form>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Your Name"
                                className="bg-dark text-white border-secondary"
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="Your Email"
                                className="bg-dark text-white border-secondary"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Form.Group className="mb-3">
                          <Form.Label>Subject</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Subject"
                            className="bg-dark text-white border-secondary"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Message</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Your Message"
                            className="bg-dark text-white border-secondary"
                          />
                        </Form.Group>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100"
                        >
                          Send Message
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card className="bg-black text-white h-100 border-0">
                    <Card.Body className="p-4">
                      <h3 className="mb-4">Contact Information</h3>
                      <div className="contact-info">
                        <div className="d-flex mb-4">
                          <div className="icon-box me-3">
                            <i className="bi bi-geo-alt-fill text-primary fs-4"></i>
                          </div>
                          <div>
                            <h5>Our Location</h5>
                            <p>
                              Simple Idea, Colombo - Kandy Road, Kanda Kapapu
                              Junction.
                            </p>
                          </div>
                        </div>
                        <div className="d-flex mb-4">
                          <div className="icon-box me-3">
                            <i className="bi bi-envelope-fill text-primary fs-4"></i>
                          </div>
                          <div>
                            <h5>Email Us</h5>
                            <p>simpleidealk@gmail.com</p>
                          </div>
                        </div>
                        <div className="d-flex mb-4">
                          <div className="icon-box me-3">
                            <i className="bi bi-telephone-fill text-primary fs-4"></i>
                          </div>
                          <div>
                            <h5>Call Us</h5>
                            <p>+94 (71) 206-4592</p>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="icon-box me-3">
                            <i className="bi bi-clock-fill text-primary fs-4"></i>
                          </div>
                          <div>
                            <h5>Business Hours</h5>
                            <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                          </div>
                        </div>
                      </div>
                      <h5 className="mt-4 mb-3">Follow Us</h5>
                      <div className="social-links">
                        <a href="#" className="btn btn-outline-primary me-2">
                          <i className="bi bi-facebook"></i>
                        </a>
                        {/* <a href="#" className="btn btn-outline-primary me-2"><i className="bi bi-instagram"></i></a> */}
                        {/* <a href="#" className="btn btn-outline-primary me-2"><i className="bi bi-twitter"></i></a> */}
                        {/* <a href="#" className="btn btn-outline-primary me-2"><i className="bi bi-linkedin"></i></a> */}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="simple-idea-website bg-dark text-white">
      {/* Navigation */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top"
        className={scrolled ? "py-2 shadow" : "py-3"}
      >
        <Container>
          <Navbar.Brand
            href="#home"
            onClick={() => setActiveTab("home")}
            className="d-flex align-items-center"
          >
            {/* <img src={logo1}  alt='Simple Idea Logo' className='col-6' /> */}
            <span className="fw-bold fs-4 me-1">Simple</span>
            <span className="text-primary fw-bold fs-4">Idea</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                href="#home"
                onClick={() => setActiveTab("home")}
                active={activeTab === "home"}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#about"
                onClick={() => setActiveTab("about")}
                active={activeTab === "about"}
              >
                About
              </Nav.Link>
              <Nav.Link
                href="#services"
                onClick={() => setActiveTab("services")}
                active={activeTab === "services"}
              >
                Services
              </Nav.Link>
              <Nav.Link
                href="#portfolio"
                onClick={() => setActiveTab("portfolio")}
                active={activeTab === "portfolio"}
              >
                Portfolio
              </Nav.Link>
              <Nav.Link
                href="#contact"
                onClick={() => setActiveTab("contact")}
                active={activeTab === "contact"}
              >
                Contact
              </Nav.Link>
            </Nav>
            <Button
              variant="primary"
              className="ms-lg-3"
              onClick={() => setActiveTab("contact")}
              active={activeTab === "contact"}
            >
              Get Quote
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <main style={{ paddingTop: "80px" }}>{renderContent()}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-5">
        <Container>
          <Row>
            <Col lg={4} className="mb-4 mb-lg-0">
              <h4 className="mb-4">Simple Idea</h4>
              <p>
                We are a full-service graphic design firm dedicated to bringing
                your ideas to life through creative and effective visual
                solutions.
              </p>
              <div className="social-icons mt-4">
                <a href="#" className="me-3 text-white">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="me-3 text-white">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="me-3 text-white">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="me-3 text-white">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4 mb-md-0">
              <h5 className="mb-4">Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-white-50"
                    onClick={() => setActiveTab("home")}
                  >
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-white-50"
                    onClick={() => setActiveTab("about")}
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-white-50"
                    onClick={() => setActiveTab("services")}
                  >
                    Services
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-white-50"
                    onClick={() => setActiveTab("portfolio")}
                  >
                    Portfolio
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none text-white-50"
                    onClick={() => setActiveTab("contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </Col>
            <Col lg={4} md={6}>
              <h5 className="mb-4">Contact Info</h5>
              <ul className="list-unstyled contact-info">
                <li className="mb-3 d-flex">
                  <i className="bi bi-geo-alt-fill text-primary me-2"></i>
                  <span>
                    Simple Idea, Colombo - Kandy Road, Kanda Kapapu Junction
                  </span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-envelope-fill text-primary me-2"></i>
                  <span>simpleidealk@gmail.com</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-telephone-fill text-primary me-2"></i>
                  <span>+94 (71) 206-4592</span>
                </li>
                <li className="d-flex">
                  <i className="bi bi-clock-fill text-primary me-2"></i>
                  <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="my-4 bg-secondary" />
          <Row>
            <Col>
              <p className="text-center mb-0">
                &copy; {new Date().getFullYear()} Simple Idea. All rights
                reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* CSS Styles */}
      <style jsx>{`
        /* Add custom styles here */
        .portfolio-overlay {
          background: rgba(0, 0, 0, 0.7);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .portfolio-img-container:hover .portfolio-overlay {
          opacity: 1;
        }

        .testimonial-carousel .carousel-item {
          padding: 2rem;
        }

        .team-card img {
          transition: transform 0.3s ease;
        }

        .team-card:hover img {
          transform: scale(1.05);
        }

        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        /* Import Bootstrap Icons */
        @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css");
      `}</style>
    </div>
  );
}

export default SimpleIdeaWebsite;
