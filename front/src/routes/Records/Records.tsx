import React from 'react';
import { Component } from 'react';
import './Records.css';
import { Link } from "react-router-dom"

import ReactTable from "react-table";
import "react-table/react-table.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { withRouter, RouteComponentProps } from "react-router";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { secondsToString, avgSpeed, beautifyDate, getDayStart, getDayEnd } from '../../utils/functions';

import EditImg from './pictures/edit.png';
import DeleteImg from './pictures/delete.png';
import Navigation from '../../components/Header/Navigation';
import { Row } from 'react-bootstrap';

interface ITableRow{
  id: number
  date: Date
  distance: number
  time: number
}

interface IDateFilterValue{
  start: number
  end: number
}

interface IDateFilter{
  id: string
  value: IDateFilterValue
}

type OnChangeDateFilter = (date: IDateFilterValue) => void;

function filterDates(filter: IDateFilter, row: ITableRow){
  //as 'date' is bad, but we can't make it better because react-table expects string and TS cannot convert string literal to string.
  const date = row[filter.id as 'date'].valueOf();
  return filter.value.start <= date && date <= filter.value.end;
}

function DateRangeColumnFilter(params: { filter: IDateFilter, onChange: OnChangeDateFilter }): React.ReactElement {
  const { filter, onChange } = params;
  const minFilterDate = Date.now() - 1000 * 60 * 60 * 24 * 7;
  const maxFilterDate = Date.now();
  const start = filter ? filter.value.start : getDayStart(new Date(minFilterDate)).valueOf();
  const end = filter ? filter.value.end : getDayEnd(new Date(maxFilterDate)).valueOf();

  return (
    <>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div style={{marginRight: 10, alignSelf: 'center'}}>from</div>
        <DatePicker
          className='pickerInputWidth'
          selected={new Date(start)}
          onChange={date => {
            if (date) {
              const val = getDayStart(date).valueOf();
              onChange({ start: val, end });
            }
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
        }}
      >
        <div style={{marginRight: 30, alignSelf: 'center'}}>to</div>
        <DatePicker
          className='pickerInputWidth'
          selected={new Date(end)}
          onChange={date => {
            if (date) {
              const val = getDayEnd(date).valueOf();
              onChange({ start, end: val });
            }
          }}
        />
      </div>
    </>
  )
}

interface IProps extends RouteComponentProps<{}>{}

interface IState{
  records: Array<object>
}

class Records extends Component <IProps, IState> {

  state = { records:[] }

  componentDidMount(){
    this.loadRecords()
  }

  async loadRecords() {
    try {
      const response = await fetch('/api/record',
        {credentials: 'include'}
      );
      const recordsJson = await response.json();
      recordsJson.forEach((record: any) => record.date = new Date(record.date));
      this.setState({records: recordsJson});
      return recordsJson;
    } catch (error) {
      console.log('ошибка')
      console.error(error);
    }
  }

  async deleteRecord(id: string) {
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
    const { records } = this.state;
    return(
      <Container>
        {<Navigation pathname={this.props.location.pathname}/>}
        <ReactTable<ITableRow>
          filterable
          data={records}
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
              filterMethod: filterDates,
              Filter: DateRangeColumnFilter,
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
                  <img alt="edit" src={EditImg} width='30px' height='30px'/>
                </Link>
              )
            },
            {
              Header: "Delete",
              accessor: "id",
              width: 70,
              Cell: row => (
                <img alt="delete" onClick={() => this.deleteRecord(row.value)} src={DeleteImg} style={{cursor: 'pointer'}}></img>
              )
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <Link to="/records/add/">
          <Button variant="outline-secondary" className='add-record-button'>
            Add new record
          </Button>
        </Link>

      </Container>

  )
 }
}

export default withRouter(Records)