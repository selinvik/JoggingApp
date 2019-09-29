import React from 'react';
import { Component } from 'react';
import './Records.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ReactTable from "react-table";
import "react-table/react-table.css";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class Records extends Component {
  
  state = {records:[]}
  
  componentWillMount(){
    this.loadRecords()
  }

  async loadRecords() {
    try {
      let response = await fetch('/api/record',
        {credentials: 'include'}
      );
      let responseJson = await response.json();
      this.setState({records: responseJson});
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  render(){
    console.log(this.state.records)
    return(
      <Container>
        <Form.Row style={{borderBottom: '1px solid black', width: '30%', marginBottom: '20px'}}>
          
          <div style={{marginRight: '30px'}}>Records</div>

          <div><Link to="/reports/">Reports</Link></div>

        </Form.Row>
        <ReactTable
        data={this.state.records}
        noDataText="Нет данных!"
        columns={[
          {
            Header: "Date",
            accessor: "date",
          },
          {
            Header: "Distance",
            accessor: "distance"
          },
          {
            Header: "Time",
            accessor: "time"
          },
          {
            Header: "Average speed",
            //accessor: "distance"
          },
          {
            Header: "Edit",
            //accessor: "distance"
          },
          {
            Header: "Delete",
            //accessor: "distance"
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"/>
        
        <Button variant="outline-secondary">
          <Link to="/records/add-new/">Add new record</Link>
        </Button>
      </Container>

  )
 }
}

export default Records