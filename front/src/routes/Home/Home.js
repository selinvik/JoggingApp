import React from 'react';
import { Component } from 'react';
import './Home.css';
import { login, validateEmail } from '../../utils/functions';
import { withRouter } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class Home extends Component {

  state = { 
    createBtnDisabled: true, 
    emailValid: false, 
    emailInputStyle: 'email-valid-style',
    isLoading: false,
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    passwordRepeat: '', 
  }

  async createAccount(){
    try {
      this.setState({ createBtnDisabled: true, isLoading: true });
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
        if (response.status === 200) {
          await login(this.state.email, this.state.password, this.props.history);
        } else if (response.status === 409) {
          alert('Такой email уже занят');
        }
        this.setState({ createBtnDisabled: false, isLoading: false });
    } catch (error) {
      this.setState({ createBtnDisabled: false, isLoading: false });
      alert('Произошла ошибка в ходе авторизации!');
      console.error(error);
    }
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
    const email = validateEmail(event.target.value);
    if (email === false) {
      this.setState({ 
        email: event.target.value, 
        createBtnDisabled: true,
        emailValid: false, 
        emailInputStyle: 'email-non-valid-style' 
      })
    }
    else this.setState({ 
      email: event.target.value, 
      createBtnDisabled: false,
      emailValid: true, 
      emailInputStyle: 'email-valid-style' 
    });
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
    const { createBtnDisabled, emailValid, emailInputStyle, isLoading, firstName, lastName, email, password, passwordRepeat } = this.state;
    return (
      <Container>
        <Row className='login-title'>Create an account</Row>
        <Form className='form-box'>
          <Form.Row className='name-row'>
            <Form.Group>
              <Form.Control
                className='firstName-input'
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={this.handleChangeFirstName.bind(this)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className='lastName-input'
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={this.handleChangeLastName.bind(this)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className='email-row'>
            <Form.Group>
              <Form.Control
                className={emailInputStyle}
                type="email"
                placeholder="Email"
                value={email}
                onChange={this.handleChangeEmail.bind(this)}
              />
              {
                emailValid ? <div></div> : <div className='non-valid-message'>enter the correct email</div>
              }
            </Form.Group>
          </Form.Row>
          <Form.Row className='password-row'>
            <Form.Group>
              <Form.Control
                className='password-input'
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChangePassword.bind(this)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row className='passwordRepeat-row'>
            <Form.Group>
              <Form.Control
                className='passwordRepeat-input'
                type="password"
                placeholder="Repeat password"
                value={passwordRepeat}
                onChange={this.handleChangePasswordRepeat.bind(this)}
              />
            </Form.Group>
          </Form.Row>
            <Button disabled={createBtnDisabled} variant="outline-secondary" onClick={() => this.createAccount()}>
            { isLoading ? 'Loading...' : 'Create an account' }
            </Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(Home)

