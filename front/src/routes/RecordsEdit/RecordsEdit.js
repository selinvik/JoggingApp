import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ReactTable from "react-table";
import "react-table/react-table.css";
import './RecordsEdit.css'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class RecordsEdit extends Component {

  state = {date: null, distance: null, time: null}

  async addRecord(id){
    try {
      const response = await fetch('/api/record',
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id        : id,
            date      : this.state.date + "",
            distance  : this.state.distance + "",
            time      : this.state.time + ""
          })
        });
        if (response.status === 200){
          this.props.history.push('/records/');
        }
        if (response.status === 401){
          alert('У вас не прав');
        }
      } catch (error) {
        alert('Произошла ошибка в ходе авторизации!');
        console.error(error);
      }
  }

  handleChangeDate(event) {
    this.setState({
        date: event.target.value
    })
  }

  handleChangeDistance(event) {
    this.setState({
        distance: event.target.value
    })
  }

  handleChangeTime(event) {
    this.setState({
        time: event.target.value
    })
  }

 render(){
  const id = +/\d+/.exec(this.props.location.pathname)
  return(
   <Container>
    <Row className='edit-title-row'>
      Edit Record
    </Row>
    <Form>
     <Form.Row>
       <Form.Group>
         <Form.Control
          type="date"
          placeholder="Date"
          value={this.state.date}
          onChange={this.handleChangeDate.bind(this)}
         />
       </Form.Group>
     </Form.Row>
     <Form.Row>
     <Form.Group>
         <Form.Control
           type="integer"
           placeholder="Distance"
           value={this.state.distance}
           onChange={this.handleChangeDistance.bind(this)}
         />
       </Form.Group>
     </Form.Row>
     <Form.Row>
       <Form.Group>
         <Form.Control
           type="integer"
           placeholder="Time"
           value={this.state.time}
           onChange={this.handleChangeTime.bind(this)}
         />
       </Form.Group>
     </Form.Row>
       <Button variant="outline-secondary" onClick={() => this.addRecord(id)}>
         CHANGE
       </Button>
   </Form>
   </Container>
  )
 }
}

export default RecordsEdit