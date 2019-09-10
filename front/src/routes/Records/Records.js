import React from 'react';
import { Component } from 'react';
import './Records.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ReactTable from "react-table";
import "react-table/react-table.css";

import Button from 'react-bootstrap/Button';

class Records extends Component {
  
  state = {records:[]}
  
  componentWillMount(){
    this.loadRecords()
  }

  async loadRecords() {
    try {
      let response = await fetch('http://localhost:8000/get-records',
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
      <div>
        <ReactTable
        data={this.state.records}
        noDataText="Нет данных!"
        style={{width: '50%'}}
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
          <Link to="/records/add-new">Add new record</Link>
        </Button>
      </div>

  )
 }
}

export default Records