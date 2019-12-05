import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { withRouter, RouteComponentProps } from "react-router";
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';

import './RecordEditor.css';
import { secondsToString, stringToSeconds, validateDate, validateDistance, validateTime } from '../../utils/functions';

interface IProps extends RouteComponentProps<{id?:string}>{}

interface IState{
  isLoading: boolean
  date: Date 
  distanceValid: boolean
  timeValid: boolean
  distance: string 
  time: string
}

class RecordEditor extends Component <IProps, IState> {

  state = { 
    isLoading: false, 
    date: new Date(), 
    distanceValid: false, 
    timeValid: false, 
    distance: '', 
    time: '' 
  }

  componentDidMount() {
    if (this.props.match.params.id !== undefined)
      this.loadRecord(this.props.match.params.id);
  }

  async loadRecord(id: string) {
    try {
      const response = await fetch('/api/record/' + id,
        { credentials: 'include' }
      );
      const recordJson = await response.json();
      this.setState({
        date: new Date(recordJson.date),
        distance: recordJson.distance,
        time: secondsToString(recordJson.time),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addRecord() {
    const id = this.props.match.params.id;
    if (!this.state.distance || !this.state.time) {
      alert('Заполните все поля');
      return;
    }

    const date = this.state.date;
    const distance = parseInt(this.state.distance);
    const time = stringToSeconds(this.state.time);


    if (validateDate(date) === false) {
      alert('Введите правильно дату');
      return;
    }

    try {
      this.setState({ isLoading : true });
      const isNewRecord = id === undefined;
      const method = isNewRecord ? 'POST' : 'PUT';
      const body: { 
        date: string 
        id?: string
        distance: string
        time: string;
      } = {
        date      : date + '',
        distance  : distance + '',
        time      : time + '',
      };
      if (!isNewRecord)
        body.id = id

      const response = await fetch('/api/record',
        {
          method,
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
        if (response.status === 200){
          this.setState({ isLoading : false });
          this.props.history.push('/records/');
        } else if (response.status === 401){
          this.setState({ isLoading : false });
          alert('Произошла ошибка в ходе авторизации');
        } else {
          this.setState({ isLoading : false });
          alert('Произошла ошибка при запросе');
          console.error(`Error ${response.status}`);
        }
    } catch (error) {
      this.setState({ isLoading : false });
      alert('Произошла ошибка при запросе!');
      console.error(error);
    }
  }

  handleChangeDate(date: Date) {
    this.setState({ date: date })
  }

  handleChangeDistance(event: React.FormEvent<FormControl & FormControlProps>){
    if(event.currentTarget.value === ''){
      this.setState({
        distance: event.currentTarget.value || '',
        distanceValid: false,
      })
    }
    else if(validateDistance(event.currentTarget.value || '') === true){
      this.setState({
        distance: event.currentTarget.value || '',
        distanceValid: true,
      })
    }
    else{
      return this.setState({
        distanceValid: false,
      })
    }
  }

  handleChangeTime(event: React.FormEvent<FormControl & FormControlProps>){
    if(event.currentTarget.value === ''){
      this.setState({
        time: event.currentTarget.value,
        timeValid: false,
      })
    }
    else if (validateTime(event.currentTarget.value || '') === true ){
      this.setState({
        time: event.currentTarget.value || '',
        timeValid: true,
      })
    }
    else{
      return this.setState({
        timeValid: false,
      })
    }
  }

 render(){
  const id = this.props.match.params.id;
  const isNewRecord = id === undefined;
  const { isLoading, distanceValid, timeValid, date, time, distance } = this.state;
  return(
    <Container>
      <Row className='add-title-row'>
        Add new record
      </Row>
      <Form>
        <Form.Row>
          <Form.Group>
            <DatePicker
              className='form-control'
              selected={date}
              onChange={this.handleChangeDate.bind(this)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Distance(m)"
              value={distance}
              onChange={this.handleChangeDistance.bind(this)}
            />
            {
              distanceValid ? <div></div> : <div className='non-valid-message'>(example: 660)</div>
            }
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="00:00:00"
              value={time}
              onChange={this.handleChangeTime.bind(this)}
            />
            {
              timeValid ? <div></div> : <div className='non-valid-message'>(example: 1:14:23)</div>
            }
          </Form.Group>
        </Form.Row>
          <Button variant="outline-secondary" onClick={this.addRecord.bind(this)}>
            { isLoading ? 'Loading...' : isNewRecord ? 'SUBMIT' : 'CHANGE' }
          </Button>
      </Form>
    </Container>
  )
 }
}

export default withRouter(RecordEditor)