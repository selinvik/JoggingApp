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

class Reports extends Component {

  async logOut(){
    try {
      const response = await fetch('/api/authentication',
        {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200){
          alert('LogOut');
          this.props.history.push('/');
        }
      } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
      }
  }

 render(){
  return(
    <Container>
      <Form.Row style={{borderBottom: '1px solid black', width: '30%', marginBottom: '20px'}}>      
        <div style={{marginRight: '30px'}}><Link to="/records/">Records</Link></div>
        <div style={{marginRight: '30px'}}>Reports</div>
        <Button variant="outline-secondary" onClick={() => this.logOut()}>LogOut</Button>
      </Form.Row>
      <ReactTable
      //data={this.state.records}
      noDataText="Нет данных!"
      columns={[
        {
          Header: "Week",
          //accessor: "date",
        },
        {
          Header: "Average distance",
          //accessor: "distance"
        },
        {
          Header: "Average speed",
          //accessor: "distance"
        },
      ]}
      defaultPageSize={5}
      className="-striped -highlight"/>
    </Container>

)
}
}

export default Reports