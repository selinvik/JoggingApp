import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ReactTable from "react-table";
import "react-table/react-table.css";
import './RecordsEdit.css'
import { stringToSeconds, validateDate } from '../../utils/functions'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class RecordsEdit extends Component {

  state = {date: null, distance: null, time: null}

  async changeRecord(id){
    if(this.state.date === null || this.state.distance === null || this.state.time === null){
      alert('Заполните все поля')
      return;
    }
    const date = this.state.date;
    const distance = parseInt(this.state.distance);
    const time = stringToSeconds(this.state.time);
    if (validateDate(date) === false){
      alert('Введите правильно дату')
    }
    else{
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
              date      : date + "",
              distance  : distance + "",
              time      : time + ""
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
           type="text"
           placeholder="Distance(m)"
           value={this.state.distance}
           onChange={this.handleChangeDistance.bind(this)}
         />
       </Form.Group>
     </Form.Row>
     <Form.Row>
       <Form.Group>
         <Form.Control
           type="text"
           placeholder="00:00:00"
           value={this.state.time}
           onChange={this.handleChangeTime.bind(this)}
         />
       </Form.Group>
     </Form.Row>
       <Button variant="outline-secondary" onClick={() => this.changeRecord(id)}>
         CHANGE
       </Button>
   </Form>
   </Container>
  )
 }
}

export default RecordsEdit