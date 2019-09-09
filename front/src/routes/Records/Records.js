import React from 'react';
import { Component } from 'react';
import './Records.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

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
      <ReactTable
        
        noDataText="Нет данных!"
        columns={[
          /*{
            Header: "Роль",
            id:"roleId",
            accessor: (d) => beautifyRole(d.roleId)
          },*/
          {
            Header: "Текст",
            id: 'text',
            accessor: (d) => <div dangerouslySetInnerHTML={{__html: d.text}}/>
          },
          {
            Header: "Переменные",
            accessor: "variables"
          }
        ]}
        filterable
        defaultPageSize={10}
        className="-striped -highlight"/>
  )
 }
}

export default Records