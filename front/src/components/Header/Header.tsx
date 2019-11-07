
import React, { Component, ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Header.css'
import { withRouter, RouteComponentProps } from "react-router";

import { login } from '../../utils/functions';

interface IProps extends RouteComponentProps<{}>{}

interface IState{
    isLoading: boolean
    loginEmail: string
    loginPassword: string
}

class Header extends Component<IProps, IState>{
    state = { isLoading: false, loginEmail: '', loginPassword: '' }

    handleChangeLoginEmail(event: React.FormEvent<FormControl & FormControlProps>) {
        this.setState({
            loginEmail: event.currentTarget.value || ''
        })
    }

    handleChangeLoginPassword(event: React.FormEvent<FormControl & FormControlProps>) {
        this.setState({
            loginPassword: event.currentTarget.value || ''
        })
    }

    async logOut(){
        try {
            this.setState({ isLoading: true });
            const response = await fetch('/api/authentication',
                {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                });
            if (response.status === 200){
              this.props.history.push('/');
            }
            this.setState({ isLoading: false });
          } catch (error) {
            this.setState({ isLoading: false });
            alert('Произошла ошибка в ходе авторизации!');
            console.error(error);
          }
    }

    render(){
        const { isLoading, loginEmail, loginPassword } = this.state;
        return (
            <Row className='header'>
                <Col className='header-title'>Jogging App</Col>
                {
                    this.props.location.pathname === "/" ?
                    <>
                    <div>
                        <Row>
                        <Col>
                        <Form.Group>
                            <Form.Control
                                className="email-input"
                                type="email"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={this.handleChangeLoginEmail.bind(this)}
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Control
                                className="password-input"
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={this.handleChangeLoginPassword.bind(this)}
                            />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Button
                            className="login-button"
                            variant="outline-secondary"
                            disabled={isLoading}
                            onClick={async () => {
                                this.setState({ isLoading: true });
                                await login(loginEmail, loginPassword, this.props.history);
                                this.setState({ isLoading: false });
                            }}
                        >
                            {isLoading ? 'Loading...' : 'Login' }
                        </Button>
                        </Col>
                        </Row>
                        </div>
                    </>
                    :
                    <Button
                        className="logout-button"
                        variant="outline-secondary"
                        onClick={() => this.logOut()}
                    >
                        Logout
                    </Button>
                }

            </Row>
        )
    }
}

export default withRouter(Header);