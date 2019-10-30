import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './Reports.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

import Container from 'react-bootstrap/Container';

import { avgWeekSpeed } from '../../utils/functions';
import Navigation from '../../components/Header/Navigation';

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
  return(
    <Container>
      <Navigation pathname={this.props.location.pathname}/>
      <ReactTable
        data={this.state.reports}
        noDataText="Нет данных!"
        columns={[
          {
            Header: "Week",
            id: 'row',
            Cell: (row) => {
              return <div>{row.index + 1}</div>;
            }
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