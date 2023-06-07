import React, {useState} from "react";
import SearchTable, {searchTableProps} from "./components/dataTable/SearchTable";
import dataDump from "./assets/dataDump";
import Navbar from "./components/ui/Navbar";
import { filter, modalField } from "./components/dataTable/SearchTable.types";


function App() {

  const [openNav, setOpenNav] = useState({clickOpen: false, mouseOpen: false}),
  [currentApp, setCurrentApp] = useState(0);



  //filter settings for pathfinder spell API
  const filterOptions: filter[] = [
    {filterName: "name", inputType: "textbox", scale: "medium"},
    {filterName: "spellType", inputType: "select", extension: "value", scale: "medium"},
    {filterName: "level", inputType: "select", varType: "number", extension: "value", scale: "small"},
    {filterName: "school", inputType: "select", extension: "value", scale: "large"},
    {filterName: "source", inputType: "select", extension: "value", scale: "xLarge"}
  ];

  const modalFields: modalField[] = [
    {fieldName: "name", displayAs: "h2", modalSection: "head"},
    {fieldName: "description", displayAs: "p", extension: "value", modalSection: "body"},
  ];

  const apiInfo = {
    local: false,
    api: {
      //url: "https://api.pathfinder2.fr/v1/pf2/spell",
      requestConfig: {
        method: "GET",
        headers: {
          //Authorization: 
        }
      }

    },
    pathToData: ["results"]
  };

  const localData = {
    local: true, data: dataDump, pathToData:["results"]
  };

  switch (currentApp) {
    case 0: 
  }

  //set which app is running by clicking navbar section
  function changeApp(iconIndex: number) {
    setCurrentApp(iconIndex);
  }

  //Logic for navbar to expand and contract, mouse over logic overridden if expand clicked
  function expandNav(event: React.MouseEvent | React.KeyboardEvent): void {
    if (event.type === "click")
      setOpenNav(navState => ({...navState, clickOpen: !navState.clickOpen}));
    else
      setOpenNav(navState => ({...navState, mouseOpen: !navState.mouseOpen}));
  }

  return (
    <div className="App">
      <Navbar expandNav={(expandNav)} navState={openNav.mouseOpen || openNav.clickOpen} navigate={changeApp} />
      <SearchTable id={{fieldName: "_id"}} filters={filterOptions} dataSource={localData} modalConfig={modalFields} />
    </div>
  )
}

export default App
