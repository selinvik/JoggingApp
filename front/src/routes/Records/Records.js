import React from 'react';
import { Component } from 'react';
import './Records.css';

import ReactTable from "react-table";
import "react-table/react-table.css";

class Records extends Component {
 render(){
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