import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ReactTable from "react-table";
import "react-table/react-table.css";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class RecordsAddNew extends Component {
 render(){
  return(
   <Container>

   Edit Record

    <Form>
     <Form.Row>
       <Form.Group>
         <Form.Control
           type="text"
           placeholder="Date"
           //value={this.state.firstName}
          // onChange={this.handleChangeFirstName.bind(this)}
         />
       </Form.Group>
     </Form.Row>
     <Form.Row>
     <Form.Group>
         <Form.Control
           type="text"
           placeholder="Distance"
           //value={this.state.lastName}
           //onChange={this.handleChangeLastName.bind(this)}
         />
       </Form.Group>
     </Form.Row>
     <Form.Row>
       <Form.Group>
         <Form.Control
           type="email" 
           placeholder="Time"
           //value={this.state.eMail}
           //onChange={this.handleChangeEmail.bind(this)}
         />
       </Form.Group>
     </Form.Row>
       <Button variant="outline-secondary" /*onClick={() => this.createAccount()}*/>
         <Link to="/records/">SUBMIT</Link>
       </Button>
   </Form>
   </Container>
  )
 }
}

export default RecordsAddNew