import React from 'react';
import { Component } from 'react';
import './Login.css';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

class Login extends Component {
  
  state = {loginEmail: null, loginPassword: null, firstName: null, lastName: null, email: null, password: null, passwordRepeat: null}

  async createAccount(){
    try {
      const response = await fetch('/api/user',
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
            email     : this.state.email + "",
            password  : this.state.password + ""
          })
        });
        if (response.status === 200){
          alert('Аккаунт успешно создан');
        }
      } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
      }
  }

  async login(){
    //console.log(this.state.loginEmail, this.state.loginPassword)
    try {
      const response = await fetch('/api/auth',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.loginEmail + "",
            password: this.state.loginPassword + "",
          })
        });
        if (response.status === 201){
          alert('Получилось');
          this.props.history.push('/records/');
        }
        if (response.status === 422){
          alert('Нету такого юзера');
          this.props.history.push('/');
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

  handleChangeLoginEmail(event) {
    this.setState({
        loginEmail: event.target.value
    })
  }

  handleChangeLoginPassword(event) {
    this.setState({
        loginPassword: event.target.value
    })
  }

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
        email: event.target.value
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
              <Form.Control
                type="email" 
                placeholder="Email"
                value={this.state.loginEmail}
                onChange={this.handleChangeLoginEmail.bind(this)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="password" 
                placeholder="Password"
                value={this.state.loginPassword}
                onChange={this.handleChangeLoginPassword.bind(this)} />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-secondary" onClick={() => this.login()}>
              <Link to="/records/">Log in</Link>
            </Button>
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
                value={this.state.email}
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
              <Link /*to="/records/"*/>Create an account</Link>
            </Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(Login)

