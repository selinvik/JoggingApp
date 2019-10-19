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

  state = {reports:[]}

  componentWillMount(){
    this.loadRecords()
  }

  async loadRecords() {
    try {
      let response = await fetch('/api/report',
        {credentials: 'include'}
      );
      let responseJson = await response.json();
      this.setState({reports: responseJson});
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

 render(){
   console.log(this.state.reports)
  return(
    <Container>
      <Form.Row style={{borderBottom: '1px solid black', width: '30%', marginBottom: '20px'}}>
        <div style={{marginRight: '30px'}}><Link to="/records/">Records</Link></div>
        <div style={{marginRight: '30px'}}>Reports</div>
      </Form.Row>
      <ReactTable
        data={this.state.reports}
        noDataText="Нет данных!"
        columns={[
          {
            Header: "Week",
            accessor: "week",
          },
          {
            Header: "Average distance",
            accessor: "avgDist"
          },
          {
            Header: "Average speed",
            accessor: "avgTime"
          },
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </Container>

)
}
}

export default Reports