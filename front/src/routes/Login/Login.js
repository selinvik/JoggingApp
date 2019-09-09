import React from 'react';
import { Component } from 'react';
import './Login.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class Login extends Component {
  
  state = {firstName: null, lastName: null, eMail: null, password: null, passwordRepeat: null}

  async createAccount(){
    try {
      const response = await fetch('http://localhost:8000/create-account',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName : this.state.firstName + "",
            lastName  : this.state.lastName + "",
            eMail     : this.state.eMail + "",
            password  : this.state.password + ""
          })
        });
        if (response.status === 200){
          alert('Получилось');
        }
      } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
      }
  }
  /*auth(){
    this.setState({isLoading: true}, async function(){
      try {
        const response = await fetch(API.url + getCurrentProject(this.props.location.pathname) + '/auth',
          {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
              login: this.state.login + "",
              password: this.state.password + "",
            })
          });
        if (response.status == 200){
          const answer = await response.json();
          localStorage.setItem("id", answer.id);
          localStorage.setItem("roleId", answer.roleId);
          const project = this.props.params.project;
          function getSectionUrl(section){
            return '/' + project + '/' + section + '/home';
          }
          //TODO this.props.history.push deprecated, but context is not accessable
          switch(answer.roleId){
            case Roles.admin: this.props.history.push(getSectionUrl('admin')); break;
            case Roles.coordinator: this.props.history.push(getSectionUrl('coordinator')); break;
            case Roles.teacher: this.props.history.push(getSectionUrl('teacher')); break;
            case Roles.user: this.props.history.push(getSectionUrl('user')); break;
            default: alert('Не верный пользователь!');
          }
        } else {
          alert('Ошибка авторизации!');
        }
      } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
      }
    });
  }*/

  handleChangeFirstName(event) {
    this.setState({
        firstName: event.target.value
    })
  }

  handleChangeLastName(event) {
    this.setState({
        lastName: event.target.value
    })
  }

  handleChangeEmail(event) {
    this.setState({
        eMail: event.target.value
    })
  }

  handleChangePassword(event) {
    this.setState({
        password: event.target.value
    })
  }

  handleChangePasswordRepeat(event) {
    this.setState({
        passwordRepeat: event.target.value
    })
  }

  render(){
    return (
      <Container>
        <Row>
          <Col>Jogging App</Col>
          <Col>
            <Form.Group>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-secondary"><Link to="/records/">Log in</Link></Button>
          </Col>
        </Row>

        Create an account

        <Form>
          <Form.Row>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={this.state.firstName}
                onChange={this.handleChangeFirstName.bind(this)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={this.state.lastName}
                onChange={this.handleChangeLastName.bind(this)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Control
                type="email" 
                placeholder="Email"
                value={this.state.eMail}
                onChange={this.handleChangeEmail.bind(this)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Control
                type="password" 
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChangePassword.bind(this)} 
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Control
                type="password" 
                placeholder="Repeat password" 
                value={this.state.passwordRepeat}
                onChange={this.handleChangePasswordRepeat.bind(this)} 
              />
            </Form.Group>
          </Form.Row>
            <Button variant="outline-secondary" onClick={() => this.createAccount()}>
              <Link to="/records/">Create an account</Link>
            </Button>
        </Form>
      </Container>
    )
  }
}

export default Login

