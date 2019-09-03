import React from 'react';
import { Component } from 'react';
import './Records.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

class Records extends Component {
 render(){
  return(
   <Table striped bordered hover>
  <thead>
    <tr>
      <th>Date</th>
      <th>Distance</th>
      <th>Time</th>
      <th>Average speed</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>08.08.2019</td>
      <td>1000</td>
      <td>5:23</td>
      <td>11.01</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
  )
 }
}

export default Records