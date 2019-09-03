import React from 'react';
import { Component } from 'react';
import './Login.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Records from '../Records/Records'

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class Login extends Component {
  render(){
    return (
      <Container>
        <Row>
          <Col>Jogging App</Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-secondary">Log In</Button>
          </Col>
        </Row>

        Create an account

        <Form>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Control
                    type="text"
                    name="firstName"
                    value='First name'
                />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Control
                type="text"
                name="lastName"
                value='Last name'
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Control type="password" placeholder="Repeat password" />
            </Form.Group>
          </Form.Row>
            <Button variant="outline-secondary"><Link to="/records/">Create an account</Link></Button>
        </Form>
      </Container>
    )
  }
}

export default Login

