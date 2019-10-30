import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import classes from './Navigation.css'
import Form from 'react-bootstrap/Form';
import { withRouter } from "react-router";

export const Navigation = ({pathname}) => (
  pathname === "/records/" ?
  <>
    <Form.Row className='navigation-row'>
      <div style={{marginRight: '30px'}}>Records</div>
      <div style={{marginRight: '30px'}}><Link to="/reports/">Reports</Link></div>
    </Form.Row>
  </>
  :
    <Form.Row className='navigation-row'>
      <div style={{marginRight: '30px'}}><Link to="/records/">Records</Link></div>
      <div style={{marginRight: '30px'}}>Reports</div>
    </Form.Row>
)

export default withRouter(Navigation);