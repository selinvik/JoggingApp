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

  beautifyDate(date) {
    var beautifydate = new Date(date);
    beautifydate = (beautifydate.getDate() + '.' + beautifydate.getMonth() + '.' + beautifydate.getFullYear());
    return beautifydate
  }

  beautifyAvgSpeed(user) {
    const distance = (parseInt(user.distance) / 1000)
    const time     = (parseInt(user.time) / 60)
    const avgSpeed = (distance / time)
    return avgSpeed
  }

  render(){
    return(
      <Container>
        <Form.Row style={{borderBottom: '1px solid black', width: '30%', marginBottom: '20px'}}>         
          <div style={{marginRight: '30px'}}>Records</div>
          <div style={{marginRight: '30px'}}><Link to="/reports/">Reports</Link></div>
          <Button variant="outline-secondary" onClick={() => this.logOut()}>LogOut</Button>
        </Form.Row>
        <ReactTable
        data={this.state.records}
        noDataText="Нет данных!"
        columns={[
          {
            Header: "Date",
            accessor: "date",
            Cell: row => this.beautifyDate(row.value)
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
            Cell: row => this.beautifyAvgSpeed(row.original)
          },
          {
            Header: "Edit",
            Cell: row => (
              <div>
                <img src='/home/viktor/Рабочий стол/JoggingApp/front/pictures/edit.png' width='20px' height='20px'/>
              </div>
            )
          },
          {
            Header: "Delete",
            Cell: row => (
              <img src='/home/viktor/Рабочий стол/JoggingApp/front/pictures/delete.png'></img>
            )
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