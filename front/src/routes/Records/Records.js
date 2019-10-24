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
import { secondsToString, avgSpeed, beautifyDate } from '../../utils/functions';

import EditImg from './pictures/edit.png';
import DeleteImg from './pictures/delete.png';

class Records extends Component {

  state = {records:[]}

  componentWillMount(){
    this.loadRecords()
  }

  async loadRecords() {
    try {
      const response = await fetch('/api/record',
        {credentials: 'include'}
      );
      const recordsJson = await response.json();
      //recordsJson.forEach(record => record.time = secondsToString(record.time));
      this.setState({records: recordsJson});
      return recordsJson;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRecord(id) {
    try {
      const response = await fetch('/api/record',
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : id
          })
        });
        if (response.status === 200){
          this.loadRecords();
        }
        if (response.status === 401){
          alert('У вас не прав');
        }
      } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
      }
  }

  render(){
    return(
      <Container>
        <Form.Row className='navigation-row'>
          <div style={{marginRight: '30px'}}>Records</div>
          <div style={{marginRight: '30px'}}><Link to="/reports/">Reports</Link></div>
        </Form.Row>
        <ReactTable
          data={this.state.records}
          noDataText="Нет данных!"
          sorted={[
            {
             id: 'date',
             desc: false
            }
          ]}
          columns={[
            {
              Header: "Date",
              accessor: 'date',
              /*Filter: NumberRangeColumnFilter,
              filter: 'between',*/
              Cell: row => beautifyDate(row.value)
            },
            {
              Header: "Distance (Metres)",
              accessor: "distance"
            },
            {
              Header: "Time",
              accessor: "time",
              Cell: row => secondsToString(row.value)
            },
            {
              Header: "Average speed (Km/hr)",
              Cell: row => avgSpeed(row.original)
            },
            {
              Header: "Edit",
              accessor: "id",
              width: 50,
              Cell: row => (
                <Link to={'/records/edit/' + row.value}>
                  <img src={EditImg} width='30px' height='30px'/>
                </Link>
              )
            },
            {
              Header: "Delete",
              accessor: "id",
              width: 70,
              Cell: row => (
                <img onClick={() => this.deleteRecord(row.value)} src={DeleteImg} style={{cursor: 'pointer'}}></img>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <Link to="/records/add-new/">
          <Button variant="outline-secondary" className='add-record-button'>
            Add new record
          </Button>
        </Link>
        
      </Container>

  )
 }
}

export default Records