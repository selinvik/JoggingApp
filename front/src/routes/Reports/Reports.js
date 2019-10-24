import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './Reports.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { avgWeekSpeed } from '../../utils/functions';

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
      <Form.Row className='navigation-row'>
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
            Header: "Average distance (Metres)",
            accessor: "avgWeekDist"
          },
          {
            Header: "Average speed (Km/hr)",
            Cell: row => avgWeekSpeed(row.original)
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