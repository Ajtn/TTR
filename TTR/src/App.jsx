import { useState, useEffect } from 'react';
import FilterTable from "./components/FilterTable";
import SearchTable from "./components/SearchTable";
import dataDump from "./assets/dataDump";


function App() {
  const filterOptions = [
    {filterName: "name", filterType: "inputType", pathInData: {key: "name", parentKey: null}},
    {filterName: "schools", filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "school", parentKey: "system"}},
    {filterName: "levels", filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "level", parentKey: "system"}},
    {filterName: "sources", filterType: "select", filterOptions: ["option 1", "option 2"], pathInData: {key: "source", parentKey: "system"}}
  ];

  return (
    <div className="App">
      <SearchTable filters={filterOptions} dataSource={{local: true, data: dataDump}} />
    </div>
  )
}

export default App
