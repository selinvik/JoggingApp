import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import ReactTable from "react-table";
import "react-table/react-table.css";
import './RecordsAddNew.css'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class RecordsAddNew extends Component {

  state = {date: null, distance: null, time: null}

  async addRecord(){
    try {
      const response = await fetch('/api/record',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
  return(
    <Container>
      <Row className='add-title-row'>
        Add new record
      </Row>
      <Form>
        <Form.Row>
          <Form.Group>
            <Form.Control
              type="date"
              //placeholder={date}
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
          <Button variant="outline-secondary" onClick={() => this.addRecord()}>
            SUBMIT
          </Button>
      </Form>
    </Container>
  )
 }
}

export default RecordsAddNew