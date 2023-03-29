import { useState, useEffect } from 'react';
import FilterTable from "./components/FilterTable";
import SearchTable from "./components/SearchTable";
import dataDump from "./assets/dataDump";


function App() {
  // const filterOptions = [
  //   {filterName: "name", filterType: "inputType", pathInData: {key: "name", parentKey: null}},
  //   {filterName: "levels", filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "level", parentKey: "system"}},
  //   {filterName: "schools", filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "school", parentKey: "system"}},
  //   {filterName: "sources", filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "source", parentKey: "system"}}
  // ];

  const filterOptions = [
    {filterName: "name", filterType: "inputType"},
    {filterName: "level", filterType: "select", extension: "value"},
    {filterName: "school", filterType: "select", extension: "value"},
    {filterName: "source", filterType: "select", extension: "value"}
  ];

  return (
    <div className="App">
      <SearchTable id={{fieldName: "_id", extension: false}} filters={filterOptions} dataSource={{local: true, data: dataDump}} />
    </div>
  )
}

export default App
